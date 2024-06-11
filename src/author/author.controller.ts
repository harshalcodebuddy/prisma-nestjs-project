import { Controller, Post, Body, UsePipes, Get, Param, Patch, Delete, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { AuthorService } from './author.service';
import { JoiValidationPipe } from '../common/pipes/validation.pipe';
import { CreateAuthorDto, createAuthorSchema } from './dto/create-author.dto';
import { UpdateAuthorDto, updateAuthorSchema } from './dto/update-author.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post('register')
  @UsePipes(new JoiValidationPipe(createAuthorSchema))
  async register(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.register(createAuthorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    try {
      return await this.authorService.findAll();
    } catch (error) {
      console.error('Error fetching authors:', error);
      throw new InternalServerErrorException('Error fetching authors');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new JoiValidationPipe(updateAuthorSchema))
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }
}
