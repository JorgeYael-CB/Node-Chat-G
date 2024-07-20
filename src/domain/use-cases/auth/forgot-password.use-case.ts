import { JwtAdapter } from '../../../config';
import { ForgotPasswordDto } from '../../dtos/auth';
import { UsersRepository } from '../../repositories';


export class ForgotPasswordUseCase {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtAdapter: JwtAdapter,
  ){}


  async start( forgotPasswordDto: ForgotPasswordDto ){
    const user = await this.usersRepository.getUser(undefined, forgotPasswordDto.name, forgotPasswordDto.email);
    const token = await this.jwtAdapter.create({userId: user.id});

    // Le enviamos un email de confirmacion con un codigo de autenticacion de 1 solo uso.

    return {
      user: {...user, password: undefined},
      token,
      status: 200,
      verificationCode: 123456,
    }
  }

}
