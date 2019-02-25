import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InstallModule } from './install';
import { UserModule, User } from './user';
import { AuthModule, AccessToken } from './auth';
import { PermissionModule, Permission, Role } from './permission';

import { env } from '../utils/env';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: env('DB_TYPE', 'mysql'),
      host: env('DB_HOST', '127.0.0.1'),
      port: Number(env('DB_PROT', 3306)),
      username: env('DB_USERNAME', 'root'),
      password: env('DB_PASSWORD', ''),
      database: env('DB_DATABASE', 'default'),
      timezone: 'Z',
      entities: [AccessToken, User, Permission, Role],
      synchronize: env('DB_SYNC', 'true') === 'true',
    }),
    InstallModule,
    UserModule,
    AuthModule,
    PermissionModule,
  ],
})
export class AppModule {}
