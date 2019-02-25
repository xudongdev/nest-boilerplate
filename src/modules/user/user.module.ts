import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { User, Role, Permission } from './entities';
import { UserController } from './controllers/user.controller';
import { UsersController } from './controllers/users.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Permission])],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController, UsersController],
})
export class UserModule {}
