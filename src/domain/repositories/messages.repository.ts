import { SendMessageDto } from "../dtos/messages";
import { MessageEntity } from "../entities";


export abstract class MessagesRepository {
  abstract sendMessage( sendMessageDto: SendMessageDto ):Promise< MessageEntity >;
}
