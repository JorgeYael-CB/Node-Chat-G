import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth";
import { CustomError } from "../../errors";
import { UsersRepository } from "../../repositories";


export class RegisterUserUseCase {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtAdapter: JwtAdapter,
  ){}


  async register( registerUserDto:RegisterUserDto ){
    const user = await this.usersRepository.register(registerUserDto);
    const token = await this.jwtAdapter.create({userId: user.id});

    if( !token ) throw CustomError.InternalServerError('Token no viene!');


    return {
      status: 201,
      user: {...user, password: undefined},
      token,
    }
  }

}
