import { Router } from "express";
import { AuthController } from "./controller";
import { UsersRepositoryImpl } from "../../infrastucture/repositories";
import { UsersDatasourceImpl } from "../../infrastucture/datasources";




const usersDatasourceMongo = new UsersDatasourceImpl();
export const usersRepositoryMongo = new UsersRepositoryImpl( usersDatasourceMongo );


export class AuthRoutes{

  static get routes():Router {
    const router = Router();
    const controller = new AuthController(usersRepositoryMongo);


    router.post('/register-user', controller.registerUser);
    router.post('/login-user', controller.loginUser);
    router.get('/forgot-password', controller.forgotPassword);
    router.patch('/reset-password', controller.resetPassword);
    router.patch('/verify-account', controller.verifyAccount);
    router.put('/update-profile', controller.updateProfile);


    return router;
  }

}
