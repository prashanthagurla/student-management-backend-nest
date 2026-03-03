import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}
  async login(email: string, password: string): Promise<any> {
    console.log('LogIn SERVICE ');
    console.log('data: ', email, password);
    return 'hello';
  }
  async sign(): Promise<any> {
    console.log('SignIn SERVICE');
    return 'hello';
  }
}
