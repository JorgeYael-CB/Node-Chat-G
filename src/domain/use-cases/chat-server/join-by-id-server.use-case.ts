import { WssService } from "../../../config";
import { ChatServerRepository } from "../../repositories";
import { JoinServerByIdDto } from '../../dtos/chat-server';

export class JoinByIdServerUseCase {

  private readonly wss = WssService.instance;

  constructor(
    private readonly chatServerRepository: ChatServerRepository,
  ){};


  public join = async( joinServerByIdDto: JoinServerByIdDto ) => {
    const server = await this.chatServerRepository.joinById(joinServerByIdDto);

    this.wss.onSendMessage('new-user-joined', {
      userId: joinServerByIdDto.userId,
      serverUuid: server.serverId,
      serverId: server.id,
      newUser: server.users.find( user => user.id === joinServerByIdDto.userId ),
    });

    return {
      server,
      status: 201,
    }
  }

}
