import { ChatServerEntity } from "../../domain/entities";

export class ChatServerMapper {

  static getChatServerFromObject( server: {[key:string]: any} ):ChatServerEntity{
    const { users, messages, limitUsers, serverId, _id, id, country } = server;
    const newServer = new ChatServerEntity(users, messages, limitUsers, serverId, _id ?? id, country);

    return newServer;
  }

}
