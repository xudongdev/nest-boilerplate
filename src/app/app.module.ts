import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { autoload } from '../modules/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([...autoload(join(__dirname, 'entities'))]),
  ],
  providers: [...autoload(join(__dirname, 'services'))],
  controllers: [...autoload(join(__dirname, 'controllers'))],
})
export class AppModule {}
