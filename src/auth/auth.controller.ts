import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthorDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async register(@Body() LoginAuthorDto: LoginAuthorDto) {
    try {
      return this.authService.login(LoginAuthorDto);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new BadRequestException('Invalid login credentials');
      }
      throw new InternalServerErrorException('Error during login');
    }
  }
}
