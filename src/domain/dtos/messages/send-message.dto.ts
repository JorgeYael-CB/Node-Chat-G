
export class SendMessageDto {

  constructor(
    public content: string,
    public userId: string | number,
    public serverId: string | number,
  ){};


  static create( body: {[key:string]: any} ): [string?, SendMessageDto?]{
    const { content, userId, serverId } = body;

    if( !content ) return ['Missing content.'];
    if( !userId ) return ['session has expired.'];
    if( !serverId ) return ['Missing server.'];

    return[ , new SendMessageDto(content, userId, serverId) ];
  }

};
