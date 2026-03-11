import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpBean } from './dto/signUp.dto';
import { ApiResponse } from 'src/common/responses/api-response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any): Promise<any> {
    console.log('controller called');
    const response = await this.authService.login(body);

    return ApiResponse.success(response, 'Login Successful', 200);
  }

  @Post('signUp')
  async signUp(@Body() bean: SignUpBean): Promise<any> {
    console.log('data', bean);
    console.log('controller called');

    const response = await this.authService.sign(bean);
    return ApiResponse.success(response, 'User registered successfully', 200);
  }
}
