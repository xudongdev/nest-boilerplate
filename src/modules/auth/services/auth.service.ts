import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import * as bcrypt from 'bcryptjs';
import * as jsonwebtoken from 'jsonwebtoken';
import { AccessToken } from '../entities/accessToken.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserService } from '../../user';
import { env } from '../../common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AccessToken)
    private readonly accessTokenRepository: Repository<AccessToken>,
    private readonly userService: UserService,
  ) {}

  async createToken(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new ForbiddenException('用户不存在。');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new ForbiddenException('密码错误。');
    }

    const token = jsonwebtoken.sign({}, env('JWT_SECRET'), {
      jwtid: uuid(),
      expiresIn: Number(env('JWT_EXPIRES_IN') || 259200),
    });

    const { jti, exp } = jsonwebtoken.decode(token) as {
      jti: string;
      exp: number;
    };

    await this.accessTokenRepository
      .create({ id: jti, user, expiresAt: new Date(exp * 1000) })
      .save();

    return token;
  }

  async validateUser({ jti }: JwtPayload): Promise<any> {
    const accessToken = await this.accessTokenRepository.findOne(jti, {
      relations: ['user', 'user.roles', 'user.permissions'],
    });

    if (!accessToken) {
      throw new UnauthorizedException('找不到令牌。');
    }

    if (accessToken.revoked) {
      throw new UnauthorizedException('令牌已被撤销。');
    }

    if (!accessToken.user) {
      throw new UnauthorizedException('令牌所属用户不存在。');
    }

    return accessToken.user;
  }
}
