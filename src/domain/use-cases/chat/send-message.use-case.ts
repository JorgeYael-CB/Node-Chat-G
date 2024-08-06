import { WssService } from '../../../config';
import { SendMessageDto } from '../../dtos/messages';
import { MessagesRepository } from '../../repositories';
import { WsType } from '../../types';


export class SendMessageUseCase {

  constructor(
    private readonly messagesRepository:MessagesRepository,
    private readonly wssService = WssService.instance,
  ){};


  async onSendMessage( sendMessageDto: SendMessageDto ){
    const message = await this.messagesRepository.sendMessage(sendMessageDto);

    const messageWs:WsType = 'client-message';
    this.wssService.onSendMessage(messageWs, message);

    return {
      status: 201,
      message,
    }
  }

}
