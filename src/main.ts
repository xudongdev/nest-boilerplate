import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

dotenv.config();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth';
import { InstallModule } from './modules/install';
import { UserModule } from './modules/user';

@Module({
  imports: [TypeOrmModule.forRoot(), InstallModule, UserModule, AuthModule],
})
class AppModule {}

(async () => {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(3000);
})();
