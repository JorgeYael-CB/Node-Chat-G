import { Request, Response } from "express";
import { SendMessageDto } from "../../domain/dtos/messages";


export class ChatController {

  constructor(){}


  sendMessage = ( req:Request, res:Response ) => {
    const [error, sendMessageDto] = SendMessageDto.create(req.body);
    if( error ) return res.status(401).json({error, status: 401});

    res.json(sendMessageDto);
  }

}
