import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'ITisMYScreatKey',  // Ensure this matches the secret used in your JwtModule
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.author.findUnique({ where: { id: payload.id } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
