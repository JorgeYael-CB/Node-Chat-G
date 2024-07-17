


export class LoginUserDto {

  constructor(
    public readonly email: string,
    public readonly password: string,
  ){};


  static create( data: {[key:string]: any} ):[String?, LoginUserDto?]{
    const { email, password } = data;


    return [, new LoginUserDto(email, password)];
  }

}
