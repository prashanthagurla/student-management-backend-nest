import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class SignUpBean {
  @IsOptional()
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  rollNumber: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  confirmPassword: string;
}
