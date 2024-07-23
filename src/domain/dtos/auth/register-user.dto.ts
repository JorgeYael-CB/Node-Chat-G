import { ValidateData } from "../../../config";



export class RegisterUserDto {

  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
    public readonly country?: string,
  ){};


  static create( data: {[key:string]: any} ):[String?, RegisterUserDto?]{
    const { email, password, name, country } = data;

    const [nameErr, nameMapper] = ValidateData.userName(name);
    const [emailErr, emailMapper] = ValidateData.email(email);
    const [passErr, passMapper] = ValidateData.password(password);

    if( nameErr || emailErr || passErr  ){
      return [nameErr ?? emailErr ?? passErr];
    }

    return [, new RegisterUserDto(emailMapper!, passMapper!, nameMapper!, country)];
  }

}
