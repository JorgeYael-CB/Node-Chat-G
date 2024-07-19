import { Router } from "express";
import { AuthController } from "./controller";
import { UsersRepositoryImpl } from "../../infrastucture/repositories";
import { UsersDatasourceImpl } from "../../infrastucture/datasources";
import { BcryptAdapter, envs, JwtAdapter } from "../../config";



const bcryptAdapter = new BcryptAdapter();
const jwtAdpater = new JwtAdapter(envs.JWT_SEED);

const usersDatasourceMongo = new UsersDatasourceImpl(bcryptAdapter);
export const usersRepositoryMongo = new UsersRepositoryImpl( usersDatasourceMongo );


export class AuthRoutes{

  static get routes():Router {
    const router = Router();
    const controller = new AuthController(usersRepositoryMongo, jwtAdpater);


    router.post('/register-user', controller.registerUser);
    router.post('/login-user', controller.loginUser);
    router.get('/forgot-password', controller.forgotPassword);
    router.patch('/reset-password', controller.resetPassword);
    router.patch('/verify-account', controller.verifyAccount);
    router.put('/update-profile', controller.updateProfile);


    return router;
  }

}
