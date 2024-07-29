import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { CustomError } from "../../domain/errors";


export class AuthMiddleware {

  constructor(
    private readonly jwtAdapter:JwtAdapter,
  ){}


  private handleError( error: any, res:Response ){
    if( error instanceof CustomError ){
      return res.status(error.status).json({error: error.error, status: error.status});
    }

    console.log(error)
    return res.status(500).json({error: 'Internal server error!', status: 500});
  }


  getUserIdByToken = async(req:Request, res:Response):Promise<string> => {
    if( req.body.userId )
      throw CustomError.Unauthorized('Please review your submitted information.');

    const authorization = req.header('Authorization');

    if( !authorization )
      throw CustomError.Unauthorized('No token provided.');

    if( !authorization.startsWith('Bearer ') )
      throw CustomError.Unauthorized('Invalid token.');

    const token = authorization.split(' ').at(1) || '';

    const payload = await this.jwtAdapter.compare<{userId: string}>(token);
    if( !payload )
      throw CustomError.Unauthorized('Invalid token.');

    return payload.userId;
  }

  validateUserFromToken = ( req:Request, res:Response, next:NextFunction ) => {
    this.getUserIdByToken( req, res )
      .then( userId => {
        req.body.userId = userId;
        next();
      })
      .catch( error => this.handleError(error, res));
  }

}
