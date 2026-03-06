import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignUpBean } from './dto/signUp.dto';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/enums/user-role';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
  ) {}
  async login(email: string, password: string): Promise<any> {
    console.log('LogIn SERVICE ');
    console.log('data: ', email, password);
    return 'hello';
  }
  async sign(signUpBean: SignUpBean): Promise<any> {
    console.log('SignIn SERVICE');
    const existingUser = await this.userRepo.findOne({
      where: { email: signUpBean.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(signUpBean.password, 10);
    const newUser = this.userRepo.create({
      fullName: signUpBean.fullName,
      email: signUpBean.email,
      rollNumber: signUpBean.rollNumber,
      password: hashedPassword,
      role: UserRole.ADMIN,
    });
    return await this.userRepo.save(newUser);
  }
}
