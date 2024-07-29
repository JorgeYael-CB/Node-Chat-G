import { UserEntity } from "./";


export class MessageEntity {

  constructor(
    public readonly user: UserEntity,
    public readonly server: any,
    public readonly content: string,
    public readonly id: string | number,
  ){};

}
