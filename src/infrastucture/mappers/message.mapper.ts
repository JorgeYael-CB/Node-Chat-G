import { MessageEntity } from "../../domain/entities";


export class MessageMapper {

  static getMessageFromObject( message: {[key:string]:any} ): MessageEntity{
    const { user, server, content, id, _id } = message;

    return new MessageEntity(user, server, content, id || _id);
  }

}
