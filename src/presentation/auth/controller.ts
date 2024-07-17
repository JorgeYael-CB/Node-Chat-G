import { Request, Response } from "express";


export class AuthController {

  constructor(){}


  registerUser = ( req:Request, res:Response ) => {
    res.json('registerUser');
  }

  loginUser = ( req:Request, res:Response ) => {
    res.json('loginUser');
  }

  updateProfile = ( req:Request, res:Response ) => {
    res.json('updateProfile');
  }

  forgotPassword = ( req:Request, res:Response ) => {
    res.json('forgotPassword');
  }

  resetPassword = ( req:Request, res:Response ) => {
    res.json('resetPassword');
  }

  verifyAccount = ( req:Request, res:Response ) => {
    res.json('verifyAccount');
  }



}
