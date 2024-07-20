import { ValidateData } from "../../../config";



export class LoginUserDto {

  constructor(
    public readonly password: string,
    public readonly email?: string,
    public readonly name?: string,
  ){};


  static create( data: {[key:string]: any} ):[String?, LoginUserDto?]{
    const { email, password, name } = data;

    const [emailErr, emailMapper] = email ? ValidateData.email(email): [undefined, undefined];
    const [nameErr, nameMapper] = name ? ValidateData.userName(name) : [undefined, undefined];
    const [passError, passMapper] = ValidateData.password(password);

    if( emailErr || passError || nameErr ){
      return [emailErr || passError || nameErr];
    }

    if( !nameMapper && !emailMapper ){
      return ['Name or email is required.'];
    }


    return [, new LoginUserDto(passMapper!, emailMapper, name)];
  }

}
