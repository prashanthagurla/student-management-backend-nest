import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JwtTokenService {
  constructor(private jwtService: JwtService) {}
  generateToken(payload: any): string {
    console.log('In generate token method of token service');
    return this.jwtService.sign(payload);
  }
}
