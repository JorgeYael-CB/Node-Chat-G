import { Router } from "express";
import { ChatServerController } from "./";
import { ChatServerRepositoryImpl } from "../../infrastucture/repositories";
import { ChatServerDatasourceImpl } from "../../infrastucture/datasources";
import { authMiddleware } from "../auth";
import { UuidAdpater } from "../../config";


export const uuidAdapter = new UuidAdpater()

const chatServerDatasource = new ChatServerDatasourceImpl(uuidAdapter);
export const chatServerRepository = new ChatServerRepositoryImpl(chatServerDatasource);


export class ChatServerRoutes {

  static get routes():Router {
    const router = Router();
    const controller = new ChatServerController(chatServerRepository);

    router.post('/join-random-server', authMiddleware.validateUserFromToken, controller.joinRandomServer);
    router.post('/join-by-id', authMiddleware.validateUserFromToken, controller.joinById);
    router.get('/get-server-data/:serverId', authMiddleware.validateUserFromToken, controller.getServerData);

    return router;
  }

}
