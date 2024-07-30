import { UserEntity } from "./";


export class ChatServerEntity {

  constructor(
    public readonly users: UserEntity[],
    public readonly messages: string[],
    public readonly limitUsers: number,
    public readonly serverId: string,
    public readonly id: string | number,
    public readonly country: string,
  ){};

}
