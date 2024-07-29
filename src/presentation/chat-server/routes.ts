import { Router } from "express";
import { ChatServerController } from "./";
import { ChatServerRepositoryImpl } from "../../infrastucture/repositories";
import { ChatServerDatasourceImpl } from "../../infrastucture/datasources";
import { authMiddleware } from "../auth";


const chatServerDatasource = new ChatServerDatasourceImpl();
export const chatServerRepository = new ChatServerRepositoryImpl(chatServerDatasource);


export class ChatServerRoutes {

  static get routes():Router {
    const router = Router();
    const controller = new ChatServerController(chatServerRepository);

    router.post('/join-random-server', authMiddleware.validateUserFromToken, controller.joinRandomServer);
    router.get('/join-by-id/:serverId', controller.joinById);

    return router;
  }

}
