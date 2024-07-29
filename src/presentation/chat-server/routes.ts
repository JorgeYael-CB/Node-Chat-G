import { Router } from "express";
import { ChatServerController } from "./";
import { ChatServerRepositoryImpl } from "../../infrastucture/repositories";
import { ChatServerDatasourceImpl } from "../../infrastucture/datasources";


const chatServerDatasource = new ChatServerDatasourceImpl();
export const chatServerRepository = new ChatServerRepositoryImpl(chatServerDatasource);


export class ChatServerRoutes {

  static get routes():Router {
    const router = Router();
    const controller = new ChatServerController(chatServerRepository);


    router.get('/join-random-server', controller.joinRandomServer);
    router.get('/join-by-id/:serverId', controller.joinById);


    return router;
  }

}
