import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from '@prisma/client';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.prisma.author.create({ data: createAuthorDto });
  }

  async findAll(): Promise<Author[]> {
    return this.prisma.author.findMany();
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
