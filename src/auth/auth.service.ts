// auth.service.ts

import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginAuthorDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

interface User {
    id:string;
    name:string;
    email:string;
    password:string;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.prisma.author.findUnique({ where: { email } });
      if (user && await bcrypt.compare(password, user.password)) {
        const { password, ...result } = user;
        return result;
      } else {
        throw new UnauthorizedException('Invalid email or password');
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Error validating user');
    }
  }

  async login(LoginAuthorDto: LoginAuthorDto) {
    try {
      const validUser = await this.validateUser(
        LoginAuthorDto.email,
        LoginAuthorDto.password,
      );
      if (validUser) {
        const payload = {
          id: validUser.id,
          name: validUser.name,
          email: validUser.email,
        };
        return {
          access_token: this.jwtService.sign(payload),
        };
      } else {
        throw new UnauthorizedException('Invalid email or password');
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Error during login');
    }
  }

}
