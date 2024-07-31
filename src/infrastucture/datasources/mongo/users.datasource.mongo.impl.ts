import { isValidObjectId } from "mongoose";
import { BcryptAdapter } from "../../../config";
import { UserModel } from "../../../database/mongo";
import { UsersDatasource } from "../../../domain/datasources";
import { LoginUserDto, RegisterUserDto, ResetPasswordUserDto, UpdateProfileUserDto } from "../../../domain/dtos/auth";
import { UserEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors";
import { UserMapper } from "../../mappers";
import { roles } from "../../../domain/types";


interface validate {
  active?: boolean;
  role?: roles;
}



export class UsersDatasourceImpl implements UsersDatasource {

  constructor(
    private readonly bcryptAdapter: BcryptAdapter,
  ){}


  private validateUserStatus( user: any, validate: validate){
    const { active, role } = validate;

    if( active && !user.active ) throw CustomError.Unauthorized(`This account has been suspended, please contact support.`);
    if( role && !user.roles.includes(role) ) throw CustomError.Unauthorized(`You do not have access to the content.`);

    return user;
  }


  private async getUserBy( email?: string, id?: any, name?: string ){
    let user;
    if( id && !isValidObjectId(id) ) throw CustomError.BadRequestException(`Id is not valid.`);
    if( !email && !id && !name ) throw CustomError.BadRequestException(`Missing name, id or name.`);

    if( id ){
      user = await UserModel.findById(id)
    } else if(email){
      user = await UserModel.findOne({email});
    } else if(name){
      user = await UserModel.findOne({name});
    }

    return user;
  }


  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.getUserBy(loginUserDto.email, undefined, loginUserDto.name);
    if( !user ) throw CustomError.BadRequestException(`There is no account with those credentials.`);

    // Verificamos las passwords
    const checkPassword = this.bcryptAdapter.comapre(loginUserDto.password, user.password);
    if( !checkPassword ) throw CustomError.BadRequestException(`The credentials are not correct.`);

    this.validateUserStatus(user, {active: true});

    return UserMapper.getUserFromObject(user);
  }


  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    try {
      const passwordHash = this.bcryptAdapter.hash(registerUserDto.password);

      const newUser = await UserModel.create({
        email: registerUserDto.email,
        name: registerUserDto.name,
        password: passwordHash,
        roles: ['USER'],
        country: registerUserDto.country,
      });

      return UserMapper.getUserFromObject(newUser);
    } catch (error: any) {
      if( error.code && error.code === 11000 ){
        if( error.keyValue.name ){
          throw CustomError.BadRequestException('This username is already in use.')
        } else if(error.keyValue.email){
          throw CustomError.BadRequestException('There is already an account with this email.')
        }
      };

      throw CustomError.InternalServerError(`${error}`);
    }
  }


  async resetPassword(resetPasswordDto: ResetPasswordUserDto): Promise<UserEntity> {
    const user = await this.getUserBy(undefined, resetPasswordDto.userId);
    if( !user ) throw CustomError.BadRequestException(`User with id: ${resetPasswordDto.userId} not found`);

    this.validateUserStatus(user, {active: true});

    const password = this.bcryptAdapter.hash(resetPasswordDto.password);
    user.password = password;
    await user.save();

    return UserMapper.getUserFromObject(user);
  }


  async getUserById(id?: any): Promise<UserEntity> {
    const user = await this.getUserBy(undefined, id);
    if( !user ) throw CustomError.BadRequestException(`User not exist!`);

    return UserMapper.getUserFromObject(user);
  }


  updateProfile(updateProfileUserDto: UpdateProfileUserDto): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }

  getUsers(): Promise<UserEntity[]> {
    throw new Error("Method not implemented.");
  }


}
