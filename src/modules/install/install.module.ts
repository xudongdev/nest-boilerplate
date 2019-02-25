import { Module } from '@nestjs/common';
import { InstallController } from './install.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [InstallController],
})
export class InstallModule {}
