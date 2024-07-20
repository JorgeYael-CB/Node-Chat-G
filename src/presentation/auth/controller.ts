import { Request, Response } from "express";
import { UsersRepository } from "../../domain/repositories";
import { ForgotPasswordDto, LoginUserDto, RegisterUserDto, ResetPasswordUserDto } from "../../domain/dtos/auth";
import { ForgotPasswordUseCase, LoginUserUseCase, RegisterUserUseCase, ResetPasswordUserUseCase } from "../../domain/use-cases/auth";
import { CustomError } from "../../domain/errors";
import { JwtAdapter } from "../../config";


export class AuthController {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtAdapter: JwtAdapter,
  ){}


  private handleError( error: any, res: Response ){
    if( error instanceof CustomError ){
      return res.status(error.status).json({status: error.status, error: error.error});
    }

    // Manejamos los errores internos
    console.log(error);

    return res.status(500).json({error: 'An unexpected error has occurred, please try again later.', status: 500});
  }


  registerUser = ( req:Request, res:Response ) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if( error ) return res.status(401).json({error, status: 401});

    new RegisterUserUseCase(this.usersRepository, this.jwtAdapter)
      .register( registerUserDto! )
        .then( data => res.status(201).json(data) )
        .catch( err => this.handleError(err, res) );
  }


  loginUser = ( req:Request, res:Response ) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if( error ) return res.status(401).json({error, status: 401});

    new LoginUserUseCase(this.usersRepository, this.jwtAdapter)
      .login( loginUserDto! )
        .then( data => res.status(200).json(data) )
        .catch( err => this.handleError(err, res) );
  }


  resetPassword = ( req:Request, res:Response ) => {
    const [error, resetPassword] = ResetPasswordUserDto.create(req.body);
    if( error ) return res.status(401).json({error, status: 401});

    new ResetPasswordUserUseCase(this.jwtAdapter, this.usersRepository)
      .reset( resetPassword! )
        .then( data => res.status(201).json(data) )
        .catch( err => this.handleError(err, res) );
  }

  forgotPassword = ( req:Request, res:Response ) => {
    const [error, forgotPasswordDto] = ForgotPasswordDto.create(req.query);
    if( error ) return res.status(401).json({error, status: 401});

    new ForgotPasswordUseCase(this.usersRepository, this.jwtAdapter)
      .start( forgotPasswordDto! )
        .then( data => res.status(200).json(data) )
        .catch( err => this.handleError(err, res) );
  }


  updateProfile = ( req:Request, res:Response ) => {
    res.json('updateProfile');
  }

  verifyAccount = ( req:Request, res:Response ) => {
    res.json('verifyAccount');
  }


}
