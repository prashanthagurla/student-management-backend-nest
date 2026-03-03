import { Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Param() username: string,
    @Param() password: string,
  ): Promise<any> {
    console.log('controller called');
    return await this.authService.login(username, password);
  }

  @Post('signIn')
  async sign(): Promise<any> {
    console.log('controller called');

    return await this.authService.sign();
  }
}
