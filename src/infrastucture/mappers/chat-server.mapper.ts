import { ChatServerEntity, MessageEntity, UserEntity } from "../../domain/entities";


export class ChatServerMapper {


  static getUserEntity = ( user: any ) => {
    const { name, email, password, img, roles, _id, id, active, country, messages, createdAt, updatedAt } = user;
    return new UserEntity(name, email, password, img, roles, _id || id, active, country, messages, createdAt, updatedAt)
  }

  static getMesageEntity = ( message: any ) => {
    const { user, server, content, id, createdAt, updatedAt } = message;
    return new MessageEntity(user, server, content, id, createdAt, updatedAt);
  }


  static getChatServerFromObject( server: {[key:string]: any} ):ChatServerEntity{
    const { users, messages, limitUsers, serverId, _id, id, country } = server;
    const serverUsers:UserEntity[] = users.map( (u: any) => this.getUserEntity(u));
    const messagesServer: MessageEntity[] = messages.map( (msg: any) =>  this.getMesageEntity(msg));

    const newServer = new ChatServerEntity(serverUsers, messagesServer, limitUsers, serverId, _id ?? id, country);
    return newServer;
  }

}
