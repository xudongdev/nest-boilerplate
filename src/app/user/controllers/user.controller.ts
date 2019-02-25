import {
  Controller,
  Get,
  Post,
  Body,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user: User) {
    return user;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    if (await this.userService.findOneByEmail(registerDto.email)) {
      throw new ForbiddenException('邮箱已被注册。');
    }

    if (await this.userService.findOneByUsername(registerDto.username)) {
      throw new ForbiddenException('用户名已被注册。');
    }

    return await this.userService.create({
      ...registerDto,
      emailVerified: false,
    });
  }
}
