import { WssService } from '../../../config';
import { SendMessageDto } from '../../dtos/messages';
import { MessagesRepository } from '../../repositories';


export class SendMessageUseCase {

  constructor(
    private readonly messagesRepository:MessagesRepository,
    private readonly wssService = WssService.instance,
  ){};


  async onSendMessage( sendMessageDto: SendMessageDto ){
    const message = await this.messagesRepository.sendMessage(sendMessageDto);
    const data = {
      userId: sendMessageDto.userId,
      content: message.content,
      serverId: sendMessageDto.serverId,
    }

    this.wssService.onSendMessage('client-message', data);

    return {
      status: 201,
      message,
      data,
    }
  }

}
