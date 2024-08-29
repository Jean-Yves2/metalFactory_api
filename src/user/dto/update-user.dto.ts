import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUserdto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
