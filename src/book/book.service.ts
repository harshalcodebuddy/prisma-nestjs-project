import {
    Injectable,
    NotFoundException,
    Inject,
    UseInterceptors,
  } from '@nestjs/common';
  import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
  import { PrismaService } from '../prisma/prisma.service';
  import { CreateBookDto } from './dto/create-book.dto';
  import { UpdateBookDto } from './dto/update-book.dto';
  import { Cache } from 'cache-manager';
  import { Book, Author, Genre } from '@prisma/client';
  
  @Injectable()
  @UseInterceptors(CacheInterceptor)
  export class BookService {
    constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}
  
    async create(createBookDto: CreateBookDto): Promise<Book> {
      const { title, authorId, genreIds } = createBookDto;
      return this.prisma.book.create({
        data: {
          title,
          authorId,
          bookGenres: {
            create: genreIds.map((genreId) => ({
              genre: { connect: { id: genreId } },
            })),
          },
        },
      });
    }
  
    async findAll(): Promise<Book[]> {
      return this.prisma.book.findMany({
        include: {
          author: true,
          bookGenres: { include: { genre: true } },
        },
      });
    }
  
    async findOne(id: string): Promise<Book> {
      const book = await this.prisma.book.findUnique({
        where: { id },
        include: {
          author: true,
          bookGenres: { include: { genre: true } },
        },
      });
  
      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
  
      return book;
    }
  
    async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
      const { title, authorId, genreIds=[] } = updateBookDto;
      return this.prisma.book.update({
        where: { id },
        data: {
          title,
          authorId,
          bookGenres: {
            deleteMany: {},
            create: genreIds.map((genreId) => ({
              genre: { connect: { id: genreId } },
            })),
          },
        },
      });
    }
  
    async remove(id: string): Promise<Book> {
      return this.prisma.book.delete({
        where: { id },
      });
    }
  
    async findBooksByAuthor(authorId: string): Promise<Book[]> {
      const cacheKey = `books-by-author-${authorId}`;
      const cachedBooks = await this.cacheManager.get<Book[]>(cacheKey);
  
      if (cachedBooks) {
        return cachedBooks;
      }
  
      const books = await this.prisma.book.findMany({
        where: { authorId },
        include: {
          author: true,
          bookGenres: { include: { genre: true } },
        },
      });
  
      await this.cacheManager.set(cacheKey, books, 300 );
  
      return books;
    }
  
    async findBooksByGenre(genreId: string): Promise<Book[]> {
      // const cacheKey = `books-by-genre-${genreId}`;
      // const cachedBooks = await this.cacheManager.get<Book[]>(cacheKey);
  
      // if (cachedBooks) {
      //   return cachedBooks;
      // }
  
      const bookGenres = await this.prisma.bookGenre.findMany({
        where: { genreId },
        include: { book: { include: { author: true, bookGenres: { include: { genre: true } } } } },
      });
  
      const books = bookGenres.map((bg) => bg.book);
  
      // await this.cacheManager.set(cacheKey, books,300 );
  
      return books;
    }
  
    async getBookDetails(id: string): Promise<any> {
      const book = await this.prisma.book.findUnique({
        where: { id },
        include: {
          author: true,
          bookGenres: { include: { genre: true } },
        },
      });
  
      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
  
      const genreDetails = await Promise.all(
        book.bookGenres.map(async (bg) => ({
          name: bg.genre.name,
          totalBooks: await this.prisma.bookGenre.count({ where: { genreId: bg.genreId } }),
        })),
      );
  
      return { ...book, genreDetails };
    }
  }
  