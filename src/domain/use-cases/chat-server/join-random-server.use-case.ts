import { WssService } from "../../../config";
import { JoinRandomServerDto } from "../../dtos/chat-server";
import { ChatServerRepository } from "../../repositories";
import { WsType } from "../../types";


export class JoinRandomServerUseCase {

  private readonly wsService = WssService.instance;

  constructor(
    private readonly chatServerRepository: ChatServerRepository,
  ){}


  async joinServer( joinRandomServerDto: JoinRandomServerDto){
    const server = await this.chatServerRepository.joinRandomServer(joinRandomServerDto);
    const wsMessage:WsType = 'new-user-joined';

    console.log(server.users);

    this.wsService.onSendMessage(wsMessage, {
      userId: joinRandomServerDto.userId,
      serverUuid: server.serverId,
      serverId: server.id,
      newUser: server.users.find( user => user.id.toString() === joinRandomServerDto.userId ),
    });

    return {
      server,
      status: 201,
    }
  }

}
