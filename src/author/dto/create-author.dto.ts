import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import * as Joi from 'joi';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export const createAuthorSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});