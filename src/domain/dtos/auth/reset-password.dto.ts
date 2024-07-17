


export class ResetPasswordUserDto {

  constructor(
    public readonly id: string,
    public readonly newPassword: string,
  ){};


  static create( data: {[key:string]: any} ):[String?, ResetPasswordUserDto?]{
    const { userId, newPassword } = data;


    return [, new ResetPasswordUserDto(userId, newPassword)];
  }

}