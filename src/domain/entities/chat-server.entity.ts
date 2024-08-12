import { MessageEntity, UserEntity } from "./";


export class ChatServerEntity {

  constructor(
    public readonly users: UserEntity[],
    public readonly messages: MessageEntity[],
    public readonly limitUsers: number,
    public readonly serverId: string,
    public readonly id: string | number,
    public readonly country: string,
  ){};

}
