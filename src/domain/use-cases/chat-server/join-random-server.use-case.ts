import { WssService } from "../../../config";
import { JoinRandomServerDto } from "../../dtos/chat-server";
import { ChatServerRepository } from "../../repositories";
import { WsType } from "../../types";


export class JoinRandomServerUseCase {

  constructor(
    private readonly chatServerRepository: ChatServerRepository,
    private readonly wsService = WssService.instance,
  ){}


  async joinServer( joinRandomServerDto: JoinRandomServerDto){
    const server = await this.chatServerRepository.joinRandomServer(joinRandomServerDto);
    const wsMessage: WsType = 'new-user-joined';

    this.wsService.onSendMessage(wsMessage, {
      userId: joinRandomServerDto.userId,
      serverId: server.serverId,
    });

    return {
      server,
      status: 201,
    }
  }

}
