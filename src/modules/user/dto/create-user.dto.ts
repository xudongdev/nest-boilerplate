import {
  Length,
  IsAlphanumeric,
  IsString,
  IsEmail,
  IsBoolean,
} from 'class-validator';
import { Role } from '../entities/role.entity';

export class CreateUserDto {
  @Length(1, 20)
  @IsAlphanumeric()
  readonly username: string;

  @Length(1, 20)
  @IsString()
  readonly nickname: string;

  @Length(6, 255)
  @IsString()
  readonly password: string;

  @Length(1, 255)
  @IsEmail()
  readonly email: string;

  @IsBoolean()
  readonly emailVerified: boolean;

  @IsBoolean()
  readonly roles?: Role[];
}
