


export class VerifyAccountUserDto {

  constructor(
    public readonly id: string,
  ){};


  static create( data: {[key:string]: any} ):[String?, VerifyAccountUserDto?]{
    const { userId } = data;


    return [, new VerifyAccountUserDto(userId)];
  }

}
