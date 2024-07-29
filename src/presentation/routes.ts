import { Router } from "express";
import { AuthRoutes } from "./auth";
import { ChatRouter } from "./chat";


export class Routes {

  static get router():Router{
    const routes = Router();


    routes.use('/auth', AuthRoutes.routes);
    routes.use('/chat', ChatRouter.routes);


    return routes;
  }

}
