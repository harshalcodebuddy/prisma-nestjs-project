import { Controller, Post, Body, UsePipes, Get, Param, Patch, Delete } from '@nestjs/common';
import { AuthorService } from './author.service';
import { JoiValidationPipe } from '../common/pipes/validation.pipe';
import { CreateAuthorDto, createAuthorSchema } from './dto/create-author.dto';
import { UpdateAuthorDto, updateAuthorSchema } from './dto/update-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createAuthorSchema))
  async create(@Body() createAuthorDto: CreateAuthorDto) {

    return this.authorService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorService.findAll();
  }

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
