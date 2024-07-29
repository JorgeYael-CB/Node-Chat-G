import { ChatServerDatasoruce } from "../../domain/datasources";
import { JoinServerByIdDto, JoinRandomServerDto } from "../../domain/dtos/chat-server";
import { ChatServerEntity } from "../../domain/entities";
import { ChatServerRepository } from "../../domain/repositories";


export class ChatServerRepositoryImpl implements ChatServerRepository {

  constructor(
    private readonly chatServerDatasource: ChatServerDatasoruce,
  ){}


  joinById(joinServerByIdDto: JoinServerByIdDto): Promise<ChatServerEntity> {
    return this.chatServerDatasource.joinById(joinServerByIdDto);
  }

  joinRandomServerDto(joinRandomServerDto: JoinRandomServerDto): Promise<ChatServerEntity> {
    return this.chatServerDatasource.joinRandomServerDto( joinRandomServerDto );
  }

}
