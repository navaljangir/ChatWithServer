// path: app/components/chat/socket-client.ts
'use client';

import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const connectSocket = (token: string) => { 
    console.log(token)
    socket = io(`${process.env.NEXT_PUBLIC_WS_URL}`, {
    auth: { token },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
  });
  console.log('socket connect' , socket);
  return socket;
};

export const getSocket = () => socket;