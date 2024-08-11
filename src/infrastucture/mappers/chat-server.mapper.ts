import { ChatServerEntity, UserEntity } from "../../domain/entities";


export class ChatServerMapper {


  static getChatServerFromObject( server: {[key:string]: any} ):ChatServerEntity{
    const { users, messages, limitUsers, serverId, _id, id, country } = server;
    const serverUsers:UserEntity[] = users.map( (u: {[key:string]: any} ) => {
      const { name, email, password, img, roles, _id, id, active, country, messages, createdAt, updatedAt } = u;
      return new UserEntity(name, email, password, img, roles, _id || id, active, country, messages, createdAt, updatedAt)
    })

    const newServer = new ChatServerEntity(serverUsers, messages, limitUsers, serverId, _id ?? id, country);

    return newServer;
  }

}
