import { JwtAdapter } from "../../../config";
import { ResetPasswordUserDto } from "../../dtos/auth";
import { UsersRepository } from "../../repositories";


export class ResetPasswordUserUseCase {

  constructor(
    private readonly jwtAdapter: JwtAdapter,
    private readonly usersRepository: UsersRepository
  ){}


  async reset( resetPasswordDto: ResetPasswordUserDto ){
    const user = await this.usersRepository.resetPassword(resetPasswordDto);
    const token = await this.jwtAdapter.create({userId: user.id});

    return {
      user: {...user, password: undefined},
      token,
      status: 201,
    }
  }

}
