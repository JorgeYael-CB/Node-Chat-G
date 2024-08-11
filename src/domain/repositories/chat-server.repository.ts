import { DisconnectServerDto, JoinRandomServerDto, JoinServerByIdDto } from "../dtos/chat-server";
import { ChatServerEntity } from "../entities";


export abstract class ChatServerRepository {

  abstract joinById( joinServerByIdDto: JoinServerByIdDto ):Promise<ChatServerEntity>;
  abstract joinRandomServer( joinRandomServerDto: JoinRandomServerDto ): Promise<ChatServerEntity>;
  abstract disconnectServer( disconnectServerDto: DisconnectServerDto ): Promise<void>;
  abstract getServerBy(serverId: any): Promise<ChatServerEntity>;

}
