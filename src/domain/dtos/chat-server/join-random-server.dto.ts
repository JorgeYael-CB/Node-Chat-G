

export class JoinRandomServerDto {

  constructor(
    public readonly userId: string,
  ){};


  static create( body: {[key:string]: any} ):[string?, JoinRandomServerDto?]{
    const { userId } = body;

    if( !userId ){
      return [`Missing token.`];
    }

    return[, new JoinRandomServerDto(userId)];
  }

}
