import { ChatServerDatasoruce } from "../../domain/datasources";
import { JoinServerByIdDto, JoinRandomServerDto, DisconnectServerDto } from "../../domain/dtos/chat-server";
import { ChatServerEntity } from "../../domain/entities";
import { ChatServerRepository } from "../../domain/repositories";


export class ChatServerRepositoryImpl implements ChatServerRepository {

  constructor(
    private readonly chatServerDatasource: ChatServerDatasoruce,
  ){}


  getServerBy(serverId: any): Promise<ChatServerEntity> {
    return this.chatServerDatasource.getServerBy(serverId);
  }


  disconnectServer(disconnectServerDto: DisconnectServerDto): Promise<void> {
    return this.chatServerDatasource.disconnectServer( disconnectServerDto );
  }


  joinById(joinServerByIdDto: JoinServerByIdDto): Promise<ChatServerEntity> {
    return this.chatServerDatasource.joinById(joinServerByIdDto);
  }

  joinRandomServer(joinRandomServerDto: JoinRandomServerDto): Promise<ChatServerEntity> {
    return this.chatServerDatasource.joinRandomServer( joinRandomServerDto );
  }

}
