import { RegisterUserDto } from "../../dtos/auth";
import { UsersRepository } from "../../repositories";


export class RegisterUserUseCase {

  constructor(
    private readonly usersRepository: UsersRepository,
  ){}


  async register( registerUserDto:RegisterUserDto ){
    const user = await this.usersRepository.register(registerUserDto);


    return {
      status: 201,
      user: {...user, password: undefined},
    }
  }

}
