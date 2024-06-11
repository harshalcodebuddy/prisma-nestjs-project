import { IsNotEmpty, IsString } from 'class-validator';
import * as Joi from 'joi';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export const createAuthorSchema = Joi.object({
  name: Joi.string().required(),
});