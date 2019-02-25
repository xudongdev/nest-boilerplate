import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

dotenv.config();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppModule } from './app';
import { AuthModule } from './modules/auth';
import { InstallModule } from './modules/install';
import { UserModule } from './modules/user';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AppModule,
    AuthModule,
    InstallModule,
    UserModule,
  ],
})
class RootModule {}

(async () => {
  const app = await NestFactory.create(RootModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(3000);
})();
