import { ValidateData } from "../../../config";



export class UpdateProfileUserDto {

  constructor(
    public readonly email?: string,
    public readonly name?: string,
    public readonly img?: string,
    public readonly country?: string,
  ){};


  static create( data: {[key:string]: any} ):[String?, UpdateProfileUserDto?]{
    const { email, name, img, country } = data;

    const [emailErr, emailMapper] = email? ValidateData.email(email): [];
    const [nameErr, nameMapper] = name? ValidateData.userName(name): [];

    if( nameErr || emailErr ){
      return [nameErr || emailErr];
    }

    return [, new UpdateProfileUserDto(emailMapper, nameMapper, img, country)];
  }

}
