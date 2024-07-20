import { ValidateData } from "../../../config";

export class ForgotPasswordDto {

  constructor(
    public readonly email?: string,
    public readonly name?: string,
  ){}


  static create( data: {[key:string]: any} ):[string?, ForgotPasswordDto?]{
    const { email, name } = data;

    if( !email && !name ){
      return ['Missing email or name'];
    }

    const [emailErr, emailMapper] = email? ValidateData.email(email) : [undefined, undefined];
    const [nameErr, nameMapper] = name? ValidateData.userName(name) : [undefined, undefined];

    if( emailErr || nameErr ){
      return [emailErr || nameErr];
    }

    return [, new ForgotPasswordDto(emailMapper, nameMapper)];
  }

}
