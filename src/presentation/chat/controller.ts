import { Request, Response } from "express";
import { SendMessageDto } from "../../domain/dtos/messages";
import { SendMessageUseCase } from "../../domain/use-cases/chat";
import { MessagesRepository } from "../../domain/repositories";
import { CustomError } from "../../domain/errors";



export class ChatController {

  constructor(
    private readonly messagesRepository: MessagesRepository,
  ){}


  private handleError( error: any, res:Response ){
    if( error instanceof CustomError ){
      return res.status(error.status).json({error: error.error, status: error.status});
    }

    console.log(error)
    return res.status(500).json({error: 'Internal server error!', status: 500});
  }

  sendMessage = ( req:Request, res:Response ) => {
    const [error, sendMessageDto] = SendMessageDto.create(req.body);
    if( error ) return res.status(401).json({error, status: 401});

    new SendMessageUseCase(this.messagesRepository)
      .onSendMessage( sendMessageDto! )
        .then( data => res.status(201).json(data) )
        .catch( err => this.handleError(err, res) );
  }

}
