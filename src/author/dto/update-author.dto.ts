import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';
import Joi from 'joi';
import { IsEmail, IsOptional, IsString } from 'class-validator';

// export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}
// export const updateAuthorSchema = Joi.object({
//     name: Joi.string().required(),
//   });

  export class UpdateAuthorDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsOptional()
    email?: string;
  
    @IsString()
    @IsOptional()
    password?: string;
  }
  
  export const updateAuthorSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
  });