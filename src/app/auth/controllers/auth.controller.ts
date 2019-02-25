import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateTokenDto } from '../dto/create-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('token')
  async createToken(@Body() { email, password }: CreateTokenDto) {
    const token = await this.authService.createToken(email, password);
    return { token };
  }
}
