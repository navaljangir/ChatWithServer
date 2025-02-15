// import type { Core } from '@strapi/strapi';
import { Core } from '@strapi/strapi';
import { Server, Socket } from 'socket.io';
import axios from 'axios'

interface AuthenticatedSocket extends Socket {
  user?: any;
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    io.on("connection", (socket: Socket) => {
      console.log("Client connected");
    
      socket.on("message", (data :  string) => {
        console.log("Received message:", data);
    
        io.emit("message", { sender: "server", content: data });
      });
    
      socket.on("disconnect", () => {
        console.log('Client disconnected');
      });
    });
  },
  }