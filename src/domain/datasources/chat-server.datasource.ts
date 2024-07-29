import { JoinRandomServerDto, JoinServerByIdDto } from "../dtos/chat-server";
import { ChatServerEntity } from "../entities";


export abstract class ChatServerDatasoruce {

  abstract joinById( joinServerByIdDto: JoinServerByIdDto ):Promise<ChatServerEntity>;
  abstract joinRandomServerDto( joinRandomServerDto: JoinRandomServerDto ): Promise<ChatServerEntity>;

}
