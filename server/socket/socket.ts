import { Server } from "socket.io";
// import webTokenService from '../utils/webToken.utils';
// import { DotenvConfig } from "../config/env.config";
// import HttpException from "../utils/HttpException.utils";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

let io: Server;

function initializeSocket(server: any) {
  console.info("Socket Initialized");
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use((socket, next) => {
    const socketToken = socket.handshake.auth.token;
    if (!socketToken) {
      return next(new Error("You are not authorized"));
    }
    try {
      console.log(process.env.JWT_SECRET);
      const auth = jwt.verify(
        socketToken.split(" ")[1],
        process.env.JWT_SECRET || "defaultKey"
      );
      if (auth) {
        socket.data.user = auth;
        next();
      } else {
        next(new Error("You are not authorized"));
      }
    } catch (error) {
      next(new Error("Token verification failed"));
    }
  });
  //@ts-ignore

  io.on("connection", async (socket) => {
    let userId = socket.data.user.userEmail || socket.data.user.email;
    console.log(`User connected: ${userId} | Socket ID: ${socket.id}`);

    socket.join(userId);
    const socketId = await getSocketIdByUserId(userId);

    socket.on("disconnect", async () => {
      console.log(`User disconnected: ${userId} | Socket ID: ${socket.id}`);
    });
  });
}

// Function to get the socket ID by user ID
async function getSocketIdByUserId(userId: string): Promise<string | null> {
  if (!io) throw new Error("Socket server not initialized");
  const sockets = await io.in(userId).fetchSockets();
  if (sockets.length > 0) {
    return sockets[0].id;
  }
  return null;
}

export { initializeSocket, io, getSocketIdByUserId };
