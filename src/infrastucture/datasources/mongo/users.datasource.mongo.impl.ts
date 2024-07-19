import { isValidObjectId } from "mongoose";
import { BcryptAdapter } from "../../../config";
import { UserModel } from "../../../database/mongo";
import { UsersDatasource } from "../../../domain/datasources";
import { LoginUserDto, RegisterUserDto, ResetPasswordUserDto, UpdateProfileUserDto } from "../../../domain/dtos/auth";
import { UserEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors";
import { UserMapper } from "../../mappers";


export class UsersDatasourceImpl implements UsersDatasource {

  constructor(
    private readonly bcryptAdapter: BcryptAdapter,
  ){}


  private async getUserBy( email?: string, id?: any, name?: string ){
    let user;
    if( id && !isValidObjectId(id) ) throw CustomError.BadRequestException(`Id is not valid.`);

    if( id ){
      user = await UserModel.findById(id)
    } else if(email){
      user = await UserModel.findOne({email});
    } else if(name){
      user = await UserModel.findOne({name});
    }

    return user;
  }


  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }


  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    try {
      const passwordHash = this.bcryptAdapter.hash(registerUserDto.password);

      const newUser = await UserModel.create({
        email: registerUserDto.email,
        name: registerUserDto.name,
        password: passwordHash,
        roles: ['USER'],
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
