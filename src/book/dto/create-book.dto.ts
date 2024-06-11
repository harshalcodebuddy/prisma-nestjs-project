import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';
import * as Joi from 'joi';

export class CreateBookDto {
  @IsString()
    @IsNotEmpty()
    title!: string;

  @IsString()
    @IsNotEmpty()
    authorId!: string;

  @IsArray()
    @ArrayNotEmpty()
    genreIds: string[] = [];
}

export const createBookSchema = Joi.object({
  title: Joi.string().required(),
  authorId: Joi.string().required(),
  genreIds: Joi.array().items(Joi.string()).required(),
});
