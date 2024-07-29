import { Router } from "express";
import { ChatController } from "./";


export class ChatRouter{

  static get routes():Router{
    const router = Router();
    const controller = new ChatController();


    router.post('/send-message', controller.sendMessage);


    return router;
  }

}
