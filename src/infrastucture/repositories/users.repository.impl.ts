import { UsersDatasource } from "../../domain/datasources";
import { LoginUserDto, RegisterUserDto, ResetPasswordUserDto, UpdateProfileUserDto } from "../../domain/dtos/auth";
import { UserEntity } from "../../domain/entities";
import { UsersRepository } from "../../domain/repositories";


export class UsersRepositoryImpl implements UsersRepository {

  constructor(
    private readonly usersDatasource: UsersDatasource,
  ){}

  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.usersDatasource.login(loginUserDto);
  }
  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.usersDatasource.register(registerUserDto);
  }
  resetPassword(resetPasswordDto: ResetPasswordUserDto): Promise<UserEntity> {
    return this.usersDatasource.resetPassword(resetPasswordDto);
  }
  updateProfile(updateProfileUserDto: UpdateProfileUserDto): Promise<UserEntity> {
    return this.usersDatasource.updateProfile(updateProfileUserDto);
  }
  getUsers(): Promise<UserEntity[]> {
    return this.usersDatasource.getUsers();
  }
  getUserById(id: any): Promise<UserEntity> {
    return this.usersDatasource.getUserById(id);
  }

}
