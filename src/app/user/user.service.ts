import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, DeepPartial } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository
      .create({
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, bcrypt.genSaltSync()),
      })
      .save();
  }

  async findAll(options?: FindOneOptions<User>) {
    return await this.userRepository.find(options);
  }

  async findOneById(
    id?: string,
    options?: FindOneOptions<User>,
  ): Promise<User> {
    return await this.userRepository.findOne(id, options);
  }

  async findOneByEmail(
    email?: string,
    options?: FindOneOptions<User>,
  ): Promise<User> {
    return await this.userRepository.findOne({ email }, options);
  }

  async findOneByUsername(
    username?: string,
    options?: FindOneOptions<User>,
  ): Promise<User> {
    return await this.userRepository.findOne({ username }, options);
  }

  async update(id: string, data: DeepPartial<User>) {
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
    }

    await this.userRepository.update(id, data);
    return await this.findOneById(id);
  }

  async remove(user: User): Promise<User> {
    return await this.userRepository.remove(user);
  }
}
