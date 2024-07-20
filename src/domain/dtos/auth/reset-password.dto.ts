import { ValidateData } from "../../../config";



export class ResetPasswordUserDto {

  constructor(
    public readonly userId: string,
    public readonly password: string,
  ){};


  static create( data: {[key:string]: any} ):[String?, ResetPasswordUserDto?]{
    const { userId, password } = data;

    if( !userId){
      return ['userId is required'];
    }

    const [passErr, passMapper] = ValidateData.password(password);
    if( passErr ){
      return [passErr];
    }

    return [, new ResetPasswordUserDto(userId, passMapper!)];
  }

}