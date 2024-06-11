import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import * as Joi from 'joi';

export class UpdateBookDto extends PartialType(CreateBookDto) {}


export const updateBookSchema = Joi.object({
  title: Joi.string(),
  authorId: Joi.string(),
  genreIds: Joi.array().items(Joi.string()),
});
