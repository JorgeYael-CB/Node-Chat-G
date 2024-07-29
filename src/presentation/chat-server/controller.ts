import { Request, Response } from "express";
import { ChatServerRepository } from "../../domain/repositories";

export class ChatServerController {

  constructor(
    private readonly chatServerRepository: ChatServerRepository,
  ){}


  joinRandomServer = ( req:Request, res:Response ) => {
    res.json('uniendote a un servidor random');
  }


  joinById = ( req:Request, res:Response) => {
    res.json('Uniendote con el id...');
  }

}
