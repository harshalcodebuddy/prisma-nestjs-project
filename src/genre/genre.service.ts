import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from '@prisma/client';

@Injectable()
export class GenreService {
  constructor(private prisma: PrismaService) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.prisma.genre.create({ data: createGenreDto });
  }

  async findAll(): Promise<Genre[]> {
    return this.prisma.genre.findMany();
  }

  async findOne(id: string): Promise<Genre|null> {
    return this.prisma.genre.findUnique({ where: { id } });
  }

  async update(id: string, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    return this.prisma.genre.update({
      where: { id },
      data: updateGenreDto,
    });
  }

  async remove(id: string): Promise<Genre> {
    return this.prisma.genre.delete({ where: { id } });
  }
}
