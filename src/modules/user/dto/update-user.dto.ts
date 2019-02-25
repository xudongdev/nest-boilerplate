import { Length, IsAlphanumeric, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @Length(1, 20)
  @IsAlphanumeric()
  readonly username?: string;

  @Length(1, 20)
  @IsString()
  readonly nickname?: string;

  @Length(6, 255)
  @IsString()
  readonly password?: string;

  @Length(1, 255)
  @IsEmail()
  readonly email?: string;
}
