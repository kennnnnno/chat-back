import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/entities/auth';
import { User } from 'src/entities/users';
import { Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; // 追加

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async getAuth(id: string, password: string) {
    //パスワードが入力されていない場合
    if (!password) {
      throw new BadRequestException();
    }
    const user = await this.userRepository.findOne({
      where: { user_id: id },
    });
    //userが見つからない場合
    if (!user) {
      throw new UnauthorizedException();
    }

    const pass_match = await bcrypt.compare(password, user.hash);
    //パスワードが違う場合
    if (!pass_match) {
      throw new UnauthorizedException();
    }

    const ret = {
      token: '',
      user_id: user.id,
    };
    // 認証レコード作成
    var expire = new Date();
    expire.setDate(expire.getDate() + 1);
    const auth = await this.authRepository.findOne({
      where: {
        user_id: Equal(user.id),
      },
    });

    if (auth) {
      // 更新
      auth.expire_at = expire;
      await this.authRepository.save(auth);
      ret.token = auth.token;
    } else {
      // 挿入

      const token = crypto.randomUUID();

      const record = {
        user_id: user.id,
        token: token,
        expire_at: expire.toISOString(),
      };

      await this.authRepository.save(record);
      ret.token = token;
    }
    return ret;
  }

  async verifyToken(token: string) {
    const auth = await this.authRepository.findOne({
      where: {
        token: Equal(token),
      },
    });
    if (!auth) {
      throw new UnauthorizedException('無効なトークンです。');
    }
    const now = new Date();
    if (new Date(auth.expire_at) < now) {
      await this.authRepository.remove(auth);
      throw new UnauthorizedException('トークンの有効期限が切れています。');
    }
    return auth.user_id;
  }
}
