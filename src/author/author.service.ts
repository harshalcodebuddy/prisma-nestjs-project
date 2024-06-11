import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async register(createAuthorDto: CreateAuthorDto) {
    const hashedPassword = await bcrypt.hash(createAuthorDto.password, 10);
    const { password, ...authorData } = createAuthorDto;
    const author = await this.prisma.author.create({
      data: { ...authorData, password: hashedPassword },
    });
    return author;
  }

  async findAll(): Promise<Author[]> {
    try {
      return await this.prisma.author.findMany();
    } catch (error) {
      console.error('Error fetching authors:', error);
      throw new InternalServerErrorException('Error fetching authors');
    }
  }

  async findOne(id: string): Promise<Author|null> {
    return this.prisma.author.findUnique({ where: { id } });
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    return this.prisma.author.update({
      where: { id },
      data: updateAuthorDto,
    });
  }

  async remove(id: string): Promise<Author> {
    return this.prisma.author.delete({ where: { id } });
  }
}
