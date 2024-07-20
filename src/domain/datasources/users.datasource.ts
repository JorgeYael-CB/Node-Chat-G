import { LoginUserDto, RegisterUserDto, ResetPasswordUserDto, UpdateProfileUserDto } from "../dtos/auth";
import { UserEntity } from "../entities";


export abstract class UsersDatasource {

  abstract login( loginUserDto: LoginUserDto ):Promise<UserEntity>;
  abstract register( registerUserDto: RegisterUserDto ):Promise<UserEntity>;
  abstract resetPassword( resetPasswordDto: ResetPasswordUserDto ): Promise< UserEntity >;
  abstract updateProfile( updateProfileUserDto: UpdateProfileUserDto ): Promise<UserEntity>;
  abstract getUsers(): Promise< UserEntity[] >;
  abstract getUser( id?: any, name?: string, email?: string ): Promise<UserEntity>;

}
