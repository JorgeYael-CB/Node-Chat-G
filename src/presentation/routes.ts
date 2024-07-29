import { Router } from "express";
import { AuthRoutes } from "./auth";
import { ChatRouter } from "./chat";
import { ChatServerRoutes } from "./chat-server";


export class Routes {

  static get router():Router{
    const routes = Router();


    routes.use('/auth', AuthRoutes.routes);
    routes.use('/chat', ChatRouter.routes);
    routes.use('/server', ChatServerRoutes.routes);


    return routes;
  }

}
