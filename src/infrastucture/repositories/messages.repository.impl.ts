import { MessagesDatasource } from "../../domain/datasources";
import { SendMessageDto } from "../../domain/dtos/messages";
import { MessageEntity } from "../../domain/entities";
import { MessagesRepository } from "../../domain/repositories"

export class MessagesRepositoryImpl implements MessagesRepository {

  constructor(
    private readonly messagesDatasource: MessagesDatasource
  ){}

  sendMessage(sendMessageDto: SendMessageDto): Promise<MessageEntity> {
    return this.messagesDatasource.sendMessage(sendMessageDto);
  }

}
