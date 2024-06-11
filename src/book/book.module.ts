// import { Module } from '@nestjs/common';
// import { BookService } from './book.service';
// import { BookController } from './book.controller';

// @Module({
//   providers: [BookService],
//   controllers: [BookController]
// })
// export class BookModule {}

// src/book/book.module.ts
import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    PrismaModule,
    CacheModule.register({
      ttl: 5, // cache time to live (in seconds)
      max: 10, // maximum number of items in cache
    }),
  ],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}

