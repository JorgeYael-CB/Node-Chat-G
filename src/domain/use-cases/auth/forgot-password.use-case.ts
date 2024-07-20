import { JwtAdapter, MailerAdapter } from '../../../config';
import { ForgotPasswordDto } from '../../dtos/auth';
import { UsersRepository } from '../../repositories';


export class ForgotPasswordUseCase {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtAdapter: JwtAdapter,
    private readonly mailerAdapter: MailerAdapter,
  ){}


  async start( forgotPasswordDto: ForgotPasswordDto ){
    const user = await this.usersRepository.getUser(undefined, forgotPasswordDto.name, forgotPasswordDto.email);
    const token = await this.jwtAdapter.create({userId: user.id});

    this.mailerAdapter.send({
      html: `
        <h1>Hola, ${user.name}, has solicitado restablecer tu password.</h1>
        <p>No compartas esto con nadie, si no fuiste tu puedes ignorar este mensaje.</p>
        <p>El codigo de verificacion para restablecer tu passwod es: <strong>${123456}</strong>.</p>
      `,
      subject: 'Restablece tu password.',
      to: user.email,
    });

    return {
      user: {...user, password: undefined},
      token,
      status: 200,
      verificationCode: 123456,
    }
  }

}
