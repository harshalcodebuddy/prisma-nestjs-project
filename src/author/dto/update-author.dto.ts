import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';
import Joi from 'joi';
import { IsOptional, IsString } from 'class-validator';

// export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}
// export const updateAuthorSchema = Joi.object({
//     name: Joi.string().required(),
//   });

  export class UpdateAuthorDto {
    @IsString()
    @IsOptional()
    name?: string;
  }
  
  export const updateAuthorSchema = Joi.object({
    name: Joi.string().optional(),
  });