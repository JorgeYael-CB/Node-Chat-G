import { ValidateData } from "../../../config";



export class LoginUserDto {

  constructor(
    public readonly email: string,
    public readonly password: string,
  ){};


  static create( data: {[key:string]: any} ):[String?, LoginUserDto?]{
    const { email, password } = data;

    const [emailErr, emailMapper] = ValidateData.email(email);
    const [passError, passMapper] = ValidateData.password(password);

    if( emailErr || passError ){
      return [emailErr || passError];
    }


    return [, new LoginUserDto(emailMapper!, passMapper!)];
  }

}
