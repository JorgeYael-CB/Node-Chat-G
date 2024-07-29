import { Router } from "express";
import { ChatController } from "./";
import { authMiddleware } from "../auth";
import { MessagesRepositoryImpl } from "../../infrastucture/repositories";
import { MessagesDatasourceMongoImpl } from "../../infrastucture/datasources/";



const messagesDatasource = new MessagesDatasourceMongoImpl
export const messagesRepository = new MessagesRepositoryImpl(messagesDatasource);


export class ChatRouter{

  static get routes():Router{
    const router = Router();
    const controller = new ChatController(messagesRepository);

    router.post('/send-message', authMiddleware.validateUserFromToken, controller.sendMessage);

    return router;
  }

}
