import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, Permission, Role, UserService } from '../user';

@Controller('install')
export class InstallController {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  @Get()
  async install() {
    const permissions = [{ name: 'add user' }];

    const roles = [{ name: 'admin', permissions: ['add user'] }];

    const users = [
      {
        username: 'admin',
        nickname: '管理员',
        password: 'P@ssw0rd',
        email: 'admin@nest-boilerplate.com',
        roles: ['admin'],
      },
    ];

    // 初始化权限
    await Promise.all(
      permissions.map(payload =>
        (async () => {
          if (
            !(await this.permissionRepository.findOne({ name: payload.name }))
          ) {
            await this.permissionRepository.create(payload).save();
          }
        })(),
      ),
    );

    // 初始化角色
    await Promise.all(
      roles.map(payload =>
        (async () => {
          if (!(await this.roleRepository.findOne({ name: payload.name }))) {
            await this.roleRepository
              .create({
                ...payload,
                permissions: await Promise.all(
                  payload.permissions.map(name =>
                    this.permissionRepository.findOne({ name }),
                  ),
                ),
              })
              .save();
          }
        })(),
      ),
    );

    // 创建用户
    await Promise.all(
      users.map(payload =>
        (async () => {
          if (
            !(await this.userRepository.findOne({ username: payload.username }))
          ) {
            await this.userService.create({
              ...payload,
              emailVerified: false,
              roles: await Promise.all(
                payload.roles.map(name =>
                  this.roleRepository.findOne({ name }),
                ),
              ),
            });
          }
        })(),
      ),
    );

    return { message: '安装成功' };
  }
}
