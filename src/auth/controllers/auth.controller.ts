import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.username, dto.password, dto.role);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    console.log("aaaaa")
    return this.authService.login(dto.username, dto.password);
  }
}
