import { Request, Response } from "express";
import { UsersRepository } from "../../domain/repositories";
import { RegisterUserDto } from "../../domain/dtos/auth";


export class AuthController {

  constructor(
    private readonly usersRepository: UsersRepository,
  ){}


  registerUser = ( req:Request, res:Response ) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if( error ) return res.status(401).json({error, status: 401});

    return res.status(201).json({user: registerUserDto, status: 201});
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
