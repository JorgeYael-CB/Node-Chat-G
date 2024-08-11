import { MessageEntity, UserEntity } from "../../domain/entities";


export class MessageMapper {

  static getUser = (user: any) => {
    const {name, email, password, img, roles, id, _id, active, country, messages, createdAt, updatedAt} = user;
    return new UserEntity(name, email, password, img, roles, id || _id, active, country, messages, createdAt, updatedAt);
  }

  static getMessageFromObject( message: {[key:string]:any} ): MessageEntity{
    const { user, server, content, id, _id, createdAt, updatedAt } = message;
    const serverUsers:UserEntity = this.getUser(user);

    return new MessageEntity(serverUsers, server, content, id || _id, createdAt, updatedAt);
  }

}
