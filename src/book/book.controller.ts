import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UsePipes,
  } from '@nestjs/common';
  import { BookService } from './book.service';
  import { CreateBookDto, createBookSchema } from './dto/create-book.dto';
  import { UpdateBookDto } from './dto/update-book.dto';
import { JoiValidationPipe } from '../common/pipes/validation.pipe';
  
  @Controller('book')
  export class BookController {
    constructor(private readonly bookService: BookService) {}
  
    @Post()
    @UsePipes(new JoiValidationPipe(createBookSchema))
    async create(@Body() createBookDto: CreateBookDto) {
      console.log("createBookDto###---->",createBookDto)
      return this.bookService.create(createBookDto);
    }
  
    @Get()
    async findAll() {
      return this.bookService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.bookService.findOne(id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateBookDto: UpdateBookDto,
    ) {
      return this.bookService.update(id, updateBookDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.bookService.remove(id);
    }
  
    @Get('author/:authorId')
    async findBooksByAuthor(@Param('authorId') authorId: string) {
      return this.bookService.findBooksByAuthor(authorId);
    }
  
    @Get('genre/:genreId')
    async findBooksByGenre(@Param('genreId') genreId: string) {
      return this.bookService.findBooksByGenre(genreId);
    }
  
    @Get('details/:id')
    async getBookDetails(@Param('id') id: string) {
      return this.bookService.getBookDetails(id);
    }
  }
  