


export class RegisterUserDto {

  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
    public readonly img: string,
  ){};


  static create( data: {[key:string]: any} ):[String?, RegisterUserDto?]{
    const { email, password, name, img } = data;


    return [, new RegisterUserDto(email, password, name, img)];
  }

}
