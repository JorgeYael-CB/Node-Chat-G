import { SendMessageDto } from "../dtos/messages";
import { MessageEntity } from "../entities";


export abstract class MessagesDatasource {
  abstract sendMessage( sendMessageDto: SendMessageDto ):Promise< MessageEntity >;
}
