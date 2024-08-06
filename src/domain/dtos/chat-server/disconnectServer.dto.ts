

export class DisconnectServerDto {

  constructor(
    public readonly serverId: string,
    public readonly userId: string,
  ){}


  static create( body: {[key:string]: any} ):[string?, DisconnectServerDto?]{
    const { serverId, userId } = body;

    if( !serverId || !userId ) return ['Missing params'];

    return [, new DisconnectServerDto(serverId, userId)];
  }

}
