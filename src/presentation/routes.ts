import { Router } from "express";
import { AuthRoutes } from "./auth";


export class Routes {

  static get router():Router{
    const routes = Router();


    routes.use('/auth', AuthRoutes.routes);


    return routes;
  }

}
