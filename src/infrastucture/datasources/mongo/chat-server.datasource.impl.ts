import { isValidObjectId } from "mongoose";
import { ChatServerDatasoruce } from "../../../domain/datasources";
import { JoinServerByIdDto, JoinRandomServerDto, DisconnectServerDto } from "../../../domain/dtos/chat-server";
import { ChatServerEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors";
import { ChatServerModel, UserModel } from "../../../database/mongo";
import { ChatServerMapper } from "../../mappers";
import { UuidAdpater } from "../../../config/uuid";


export class ChatServerDatasourceImpl implements ChatServerDatasoruce {

  constructor(
    private readonly uuidAdapter:UuidAdpater,
  ){}


  async disconnectServer(disconnectServerDto: DisconnectServerDto): Promise<void> {
    console.log(`Se fue el usuario: ${disconnectServerDto.userId} del servidor: ${disconnectServerDto.serverId}`);
  }


  private async getUserById( userId: any ){
    if( !isValidObjectId(userId) ) throw CustomError.BadRequestException('Id is not valid.');

    const user = await UserModel.findById(userId);
    if( !user ) throw CustomError.BadRequestException('User not found.');

    return user;
  }

  joinById(joinServerByIdDto: JoinServerByIdDto): Promise<ChatServerEntity> {
    throw new Error("Method not implemented.");
  };


  async joinRandomServer(joinRandomServerDto: JoinRandomServerDto): Promise<ChatServerEntity> {
    // Traer al usuario con ese ID
    let server;
    const user = await this.getUserById( joinRandomServerDto.userId );

    // Validar que hayan servidores disponibles con la region del usuario
    server = await ChatServerModel.findOne({country: user.country});

    // Si no hay, crear un nuevo servidor con la region del usuario.
    if( !server ){
      server = await ChatServerModel.create({
        country: user.country,
        users: [user._id],
        serverId: this.uuidAdapter.id,
      });
    } else {
      server.users.forEach( usr => {
        if( usr.toString() === user._id.toString() ){
          throw CustomError.BadRequestException('User already server.');
        }
      });

      server.users.push(user._id);
      await server.save();
    }

    //retornar el servidor con sus ultimos 10 mensajes.
    return ChatServerMapper.getChatServerFromObject( await server.populate('users', {
      name: 1,
      country: 1,
      img: 1,
    }));
  };


}
