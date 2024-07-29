import { SendMessageDto } from '../../dtos/messages';
import { MessagesRepository } from '../../repositories';


export class SendMessageUseCase {

  constructor(
    private readonly messagesRepository:MessagesRepository,
  ){};


  async onSendMessage( sendMessageDto: SendMessageDto ){
    const message = await this.messagesRepository.sendMessage(sendMessageDto);

    return {
      status: 201,
      message,
    }
  }

}
