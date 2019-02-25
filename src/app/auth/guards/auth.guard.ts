import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard as BaseAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends BaseAuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err) {
      throw err;
    }

    if (info) {
      switch (info.message) {
        case 'No auth token':
          throw new UnauthorizedException('缺少访问令牌。');
        case 'invalid token':
          throw new UnauthorizedException('访问令牌无效。');
        default:
          throw new UnauthorizedException(info.message);
      }
    }

    if (!user) {
      throw new UnauthorizedException('用户不存在。');
    }

    return user;
  }
}
