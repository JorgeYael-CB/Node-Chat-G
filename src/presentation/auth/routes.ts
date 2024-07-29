import { Router } from "express";
import { AuthController } from "./controller";
import { UsersRepositoryImpl } from "../../infrastucture/repositories";
import { UsersDatasourceImpl } from "../../infrastucture/datasources";
import { BcryptAdapter, envs, JwtAdapter, MailerAdapter } from "../../config";
import { AuthMiddleware } from "../middlewares";



const bcryptAdapter = new BcryptAdapter();
const jwtAdpater = new JwtAdapter(envs.JWT_SEED);
export const mailerAdapter = new MailerAdapter({
  mailerPass: envs.MAILER_PASS,
  mailerUser: envs.MAILER_USER,
});

const usersDatasourceMongo = new UsersDatasourceImpl(bcryptAdapter);
export const usersRepositoryMongo = new UsersRepositoryImpl( usersDatasourceMongo );
export const authMiddleware = new AuthMiddleware(jwtAdpater);


export class AuthRoutes{

  static get routes():Router {
    const router = Router();
    const controller = new AuthController(usersRepositoryMongo, jwtAdpater, mailerAdapter);


    router.post('/register-user', controller.registerUser);
    router.post('/login-user', controller.loginUser);
    router.get('/forgot-password', controller.forgotPassword);
    router.patch('/reset-password', controller.resetPassword);
    router.patch('/verify-account', controller.verifyAccount);
    router.put('/update-profile', controller.updateProfile);


    return router;
  }

}
