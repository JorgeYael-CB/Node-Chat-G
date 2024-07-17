


export class UpdateProfileUserDto {

  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
    public readonly img: string,
  ){};


  static create( data: {[key:string]: any} ):[String?, UpdateProfileUserDto?]{
    const { email, password, name, img } = data;


    return [, new UpdateProfileUserDto(email, password, name, img)];
  }

}
