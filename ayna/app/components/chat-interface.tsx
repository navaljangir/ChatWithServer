"use client";
import { useEffect, useState } from "react";
import { connectSocket, getSocket } from "../lib/socket-client";
import { getToken } from "../lib/getToken";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useAuthStore } from "../lib/store/authStore";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface MessageType {
  sender: string;
  content: string;
  id: string; 
}

interface SessionType {
  id: string;
  name: string;
  createdAt: number;
}

export default function ChatInterface() {
    const [message, setMessage] = useState("");
    const [history, setHistory] = useState<MessageType[]>([]);
    const [sessions, setSessions] = useState<SessionType[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string>("");
    const userId = useAuthStore().userId;
  
    // Initialize sessions
    useEffect(() => {
      const loadSessions = () => {
        const savedSessions = JSON.parse(
          localStorage.getItem(`chatSessions:${userId}`) || "[]"
        );
        
        if (savedSessions.length === 0) {

        } else {
          setSessions(savedSessions);
          setActiveSessionId(savedSessions[0].id);
        }
      };
  
      loadSessions();
    }, [userId]);
  
    // Load session history when active session changes
    useEffect(() => {
      if (!activeSessionId) return;
  
      const savedHistory = JSON.parse(
        localStorage.getItem(`chatHistory:${userId}:${activeSessionId}`) || "[]"
      );
      setHistory(savedHistory);
  
      const token = getToken;
      if (!token) return;
  
      const socket = connectSocket(token);
  
      socket.on("message", (msg: MessageType) => {
        setHistory(prev => {
          const newHistory = [...prev, { ...msg, id: crypto.randomUUID() }];
          localStorage.setItem(
            `chatHistory:${userId}:${activeSessionId}`,
            JSON.stringify(newHistory)
          );
          return newHistory;
        });
      });
  
      return () => {
        socket.disconnect();
      };
    }, [userId, activeSessionId]);
  
    //Create a new Session
    const createNewSession = (name: string) => {
      const newSession = {
        id: crypto.randomUUID(),
        name,
        createdAt: Date.now(),
      };
      
      const updatedSessions = [...sessions, newSession];
      localStorage.setItem(`chatSessions:${userId}`, JSON.stringify(updatedSessions));
      setSessions(updatedSessions);
      return newSession;
    };
  
    const deleteSession = (sessionId: string) => {
      const updatedSessions = sessions.filter(s => s.id !== sessionId);
      setSessions(updatedSessions);
      localStorage.setItem(`chatSessions:${userId}`, JSON.stringify(updatedSessions));
      localStorage.removeItem(`chatHistory:${userId}:${sessionId}`);
  
      if (sessionId === activeSessionId && updatedSessions.length > 0) {
        setActiveSessionId(updatedSessions[0].id);
      }else if(updatedSessions.length===0){
        clearAllSessions()
      }
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(!activeSessionId){
        toast.error('Create or Select a session' , {
            duration : 2000,
            className : 'text-red-700'
        })
        return
      }
      if (!message.trim()) {
        toast.error("Enter some message");
        return;
      }
  
      const newMessage = {
        sender: "user",
        content: message,
        id: crypto.randomUUID(),
      };
  
      setHistory(prev => {
        const newHistory = [...prev, newMessage];
        localStorage.setItem(
          `chatHistory:${userId}:${activeSessionId}`,
          JSON.stringify(newHistory)
        );
        return newHistory;
      });
  
      getSocket().emit("message", message);
      setMessage("");
    };
  
    const handleDeleteMessage = (id: string) => {
      setHistory(prev => {
        const newHistory = prev.filter(msg => msg.id !== id);
        localStorage.setItem(
          `chatHistory:${userId}:${activeSessionId}`,
          JSON.stringify(newHistory)
        );
        return newHistory;
      });
    };
    const clearAllSessions = ()=>{
        setSessions([])
                setHistory([])
                localStorage.clear()
    }
  return (
    <Card className="md:w-[500px] h-full mt-40 md:mt-0 flex flex-col">
      <CardHeader>
        <CardTitle className="flex flex-col justify-center items-center">
          <span className="text-2xl">Chat With Server</span>
          <div className="flex gap-2 mt-2 custom-scrollbar">
            <Button
              onClick={() => createNewSession(`Session ${sessions.length + 1}`)}
              variant="secondary"
            >
              New Session
            </Button>
            <Button
              onClick={() => {
                setHistory([]);
                localStorage.removeItem(`chatHistory:${userId}:${activeSessionId}`);
              }}
            >
              Clear Current Session
            </Button>
            <Button onClick={clearAllSessions}>
                Delete All Sessions
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <div className="flex gap-2 p-4 overflow-x-auto border-b">
        {sessions.map((session) => (
          <div key={session.id} className="relative group">
            <button
              onClick={() => setActiveSessionId(session.id)}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                activeSessionId === session.id
                  ? "bg-blue-500 "
                  :"border-2"
              }`}
            >
              <span>{session.name}</span>
            </button>
            <button
              onClick={() => deleteSession(session.id)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <CardContent className="h-full overflow-y-auto custom-scrollbar">
        {history.length === 0 && (
          <div className="flex justify-center">No messages in this session</div>
        )}
        {history.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 mb-3 rounded-lg max-w-[80%] break-words relative pr-8 ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-100 text-gray-800 mr-auto"
            }`}
          >
            {msg.sender === "user" && (
              <button
                onClick={() => handleDeleteMessage(msg.id)}
                className="absolute top-1 right-1 p-1 text-red-600 opacity-70 hover:opacity-100"
              >
                <Trash2 />
              </button>
            )}
            <p className="text-sm">{msg.content}</p>
            {msg.sender !== "user" && (
              <p className="text-xs mt-1 text-gray-500">Server response</p>
            )}
          </div>
        ))}
      </CardContent>
      <CardFooter className="w-full">
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send
          </button>
        </form>
      </CardFooter>
    </Card>
  );
}
