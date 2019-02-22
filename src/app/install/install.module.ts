import { Module } from '@nestjs/common';
import { InstallController } from './install.controller';
import { UserModule } from '../user/user.module';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [UserModule, PermissionModule],
  controllers: [InstallController],
})
export class InstallModule {}
