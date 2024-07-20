import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth";
import { UsersRepository } from "../../repositories";


export class LoginUserUseCase {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtAdapter: JwtAdapter,
  ){}


  async login(loginUserDto: LoginUserDto){
    const user = await this.usersRepository.login(loginUserDto);
    const token = await this.jwtAdapter.create({userId: user.id});

    return {
      user: {...user, password: undefined},
      token,
      status: 200,
    }
  }
}
