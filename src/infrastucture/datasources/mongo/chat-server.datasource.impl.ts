import { ChatServerDatasoruce } from "../../../domain/datasources";
import { JoinServerByIdDto, JoinRandomServerDto } from "../../../domain/dtos/chat-server";
import { ChatServerEntity } from "../../../domain/entities";


export class ChatServerDatasourceImpl implements ChatServerDatasoruce {

  constructor(){}


  joinById(joinServerByIdDto: JoinServerByIdDto): Promise<ChatServerEntity> {
    throw new Error("Method not implemented.");
  };

  joinRandomServerDto(joinRandomServerDto: JoinRandomServerDto): Promise<ChatServerEntity> {
    throw new Error("Method not implemented.");
  };

}
