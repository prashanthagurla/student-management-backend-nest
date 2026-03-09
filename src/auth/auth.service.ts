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
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
    private jwtService: JwtService,
  ) {}
  async login(body: any): Promise<any> {
    console.log('LogIn SERVICE ');
    console.log('data: ', body);

    const user = await this.userRepo.findOne({
      where: { email: body.email },
    });
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    if (!user.activeFlag) {
      throw new Error('User is not active');
    }
    const isMatch = await bcrypt.compare(body.password, user.password);

    // if (body.password !== user.password) {
    //   throw Error('Invalid Password');
    // }
    this.jwtService.generateToken();

    return 'hello fdgfdgdfg';
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
