import { Request, Response } from "express";
import { ChatServerRepository } from "../../domain/repositories";
import { JoinRandomServerDto } from "../../domain/dtos/chat-server";

export class ChatServerController {

  constructor(
    private readonly chatServerRepository: ChatServerRepository,
  ){}


  joinRandomServer = ( req:Request, res:Response ) => {
    const [error, joinRandomServerDto] = JoinRandomServerDto.create(req.body);
    if( error ) return res.status(400).json({error, status: 400});

    return res.json(joinRandomServerDto);
  }


  joinById = ( req:Request, res:Response) => {
    res.json('Uniendote con el id...');
  }

}
