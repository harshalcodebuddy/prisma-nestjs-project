// src/author/author.module.ts
import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
@Module({
  imports: [PrismaModule],
  controllers: [AuthorController],
  providers: [AuthorService,PrismaService],
})
export class AuthorModule {}
