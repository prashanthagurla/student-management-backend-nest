import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpBean } from './dto/signUp.dto';
import { ApiResponse } from 'src/common/responses/api-response';

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

  @Post('signUp')
  async signUp(@Body() bean: SignUpBean): Promise<any> {
    console.log('data', bean);
    console.log('controller called');

    const response = await this.authService.sign(bean);
    return ApiResponse.success(response, 'User registered successfully', 200);
  }
}
