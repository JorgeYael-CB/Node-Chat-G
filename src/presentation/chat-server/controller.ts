import { Request, Response } from "express";
import { ChatServerRepository } from "../../domain/repositories";
import { JoinRandomServerDto, JoinServerByIdDto } from "../../domain/dtos/chat-server";
import { JoinByIdServerUseCase, JoinRandomServerUseCase } from "../../domain/use-cases/chat-server";
import { CustomError } from "../../domain/errors";

export class ChatServerController {

  constructor(
    private readonly chatServerRepository: ChatServerRepository,
  ){}

  private handleError( error: any, res:Response ){
    if( error instanceof CustomError ){
      return res.status(error.status).json({error: error.error, status: error.status});
    }

    console.log(error)
    return res.status(500).json({error: 'Internal server error!', status: 500});
  }

  joinRandomServer = ( req:Request, res:Response ) => {
    const [error, joinRandomServerDto] = JoinRandomServerDto.create(req.body);
    if( error ) return res.status(400).json({error, status: 400});

    new JoinRandomServerUseCase(this.chatServerRepository)
      .joinServer(joinRandomServerDto!)
        .then( data => res.status(201).json(data) )
        .catch( err => this.handleError(err, res) );
  }


  joinById = ( req:Request, res:Response) => {
    const [error, joinServerByDto] = JoinServerByIdDto.create(req.body);
    if( error ) return res.status(400).json({error, status: 400});

    new JoinByIdServerUseCase(this.chatServerRepository)
      .join( joinServerByDto! )
        .then( data => res.status(201).json(data) )
        .catch( err => this.handleError(err, res) );
  }


  getServerData = ( req:Request, res:Response ) => {
    const { serverId } = req.params;

    this.chatServerRepository.getServerBy(serverId)
      .then( data => {
        return res.status(200).json({
          server: data,
          status: 200
        });
      })
      .catch( err => this.handleError(err, res) );
  }

}
