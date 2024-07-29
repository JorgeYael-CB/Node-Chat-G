

export class JoinServerByIdDto {

  constructor(
    public readonly serverId: string,
    public readonly userId: string,
  ){};


  static create( body: {[key:string]: any} ):[string?, JoinServerByIdDto?]{
    const { serverId, userId } = body;

    if( !serverId || !userId ){
      return [`Missing Id's`];
    }

    return[, new JoinServerByIdDto(serverId, userId)];
  }

}
