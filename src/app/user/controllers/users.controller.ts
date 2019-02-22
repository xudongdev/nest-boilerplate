import {
  Controller,
  Get,
  Put,
  Patch,
  Post,
  Delete,
  Body,
  Param,
  ForbiddenException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';

import { User } from '../user.entity';
import { UserService } from '../user.service';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { AuthGuard } from '../../auth/auth.guard';
import { RolesGuard } from '../../permission/guards/roles.guard';

import { Roles } from '../../permission/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@Controller('users')
@Roles('admin')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index() {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if (await this.userService.findOneByEmail(createUserDto.email)) {
      throw new ForbiddenException('邮箱已被使用。');
    }

    if (await this.userService.findOneByUsername(createUserDto.username)) {
      throw new ForbiddenException('用户名已被使用。');
    }

    return await this.userService.create(createUserDto);
  }

  @Put('/:id')
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.findOneById(id);

    if (!user) {
      throw new NotFoundException('用户不存在。');
    }

    return await this.userService.update(id, updateUserDto);
  }

  @Delete('/:id')
  async remove(@CurrentUser() currentUser: User, @Param('id') id: string) {
    const user = await this.userService.findOneById(id);

    if (!user) {
      throw new NotFoundException('用户不存在。');
    }

    if (user.id === currentUser.id) {
      throw new ForbiddenException('不能删除当前用户。');
    }

    await this.userService.remove(user);
    return;
  }
}
