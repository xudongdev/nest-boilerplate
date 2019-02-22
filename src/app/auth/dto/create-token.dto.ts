import { Length, IsString, IsEmail } from 'class-validator';

export class CreateTokenDto {
  @Length(1, 255)
  @IsEmail()
  readonly email: string;

  @Length(6, 255)
  @IsString()
  readonly password: string;
}
