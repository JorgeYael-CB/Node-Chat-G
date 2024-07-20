import { ValidateData } from "../../../config";

export class ForgotPasswordDto {

  constructor(
    public readonly email: string,
  ){}


  static create( data: {[key:string]: any} ):[string?, ForgotPasswordDto?]{
    const { email } = data;

    const [emailErr, emailMapper] = ValidateData.email(email);
    if( emailErr ){
      return [emailErr];
    }

    return [, new ForgotPasswordDto(emailMapper!)];
  }

}
