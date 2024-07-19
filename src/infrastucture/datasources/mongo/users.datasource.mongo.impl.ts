import { UsersDatasource } from "../../../domain/datasources";
import { LoginUserDto, RegisterUserDto, ResetPasswordUserDto, UpdateProfileUserDto } from "../../../domain/dtos/auth";
import { UserEntity } from "../../../domain/entities";


export class UsersDatasourceImpl implements UsersDatasource {

  constructor(){}

  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }

  resetPassword(resetPasswordDto: ResetPasswordUserDto): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }

  updateProfile(updateProfileUserDto: UpdateProfileUserDto): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }

  getUsers(): Promise<UserEntity[]> {
    throw new Error("Method not implemented.");
  }

  getUserById(id: any): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }

}
