import { isValidObjectId } from "mongoose";
import { MessagesDatasource } from "../../../domain/datasources";
import { SendMessageDto } from "../../../domain/dtos/messages";
import { MessageEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors";
import { ChatServerModel, MessageModel, UserModel } from "../../../database/mongo";
import { roles } from "../../../domain/types";
import { MessageMapper } from "../../mappers";

export class MessagesDatasourceMongoImpl implements MessagesDatasource {

  constructor(){}


  private async getUserById( id: any ){
    if( !isValidObjectId(id) ) throw CustomError.BadRequestException(`Id is not valid.`);
    const user = await UserModel.findById(id);

    if( !user ) throw CustomError.BadRequestException(`User with id ${id} not found.`);
    return user;
  }

  private async getServerById( id: any ){
    if( !isValidObjectId(id) ) throw CustomError.BadRequestException(`Id is not valid.`);
    const server = await ChatServerModel.findById( id );

    if( !server ) throw CustomError.BadRequestException(`Server with id: ${id} not found.`);
    return server;
  }

  private checkUserStatus( user:any, roles?:roles[] ){
    if( !user.active ) throw CustomError.BadRequestException(`This Account Has Been Suspended.`);

    roles?.forEach( role => {
      if( !user.roles.includes(role) ) throw CustomError.BadRequestException(`the user does not have access to this content.`);
    });
  }


  async sendMessage(sendMessageDto: SendMessageDto): Promise<MessageEntity> {
    const { content, serverId, userId } = sendMessageDto;

    const [chatServer, user] = await Promise.all([
      this.getServerById(serverId),
      this.getUserById(userId),
    ]);

    this.checkUserStatus(user, ['USER']);

    const newMessage = await MessageModel.create({
      content,
      server: serverId,
      user: userId,
    });

    chatServer.messages.push(newMessage._id);
    chatServer.save();

    return MessageMapper.getMessageFromObject(newMessage);
  }

}
