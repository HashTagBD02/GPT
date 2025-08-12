import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

class RegisterDto {
  @IsEmail()
  email!: string;

  @MinLength(8)
  password!: string;

  @IsNotEmpty()
  displayName!: string;
}

class LoginDto {
  @IsEmail()
  email!: string;

  @MinLength(8)
  password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.auth.register(body.email, body.password, body.displayName);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.auth.login(body.email, body.password);
  }
}