import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstallModule } from './install/install.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    InstallModule,
    UserModule,
    AuthModule,
    PermissionModule,
  ],
})
export class AppModule {}
