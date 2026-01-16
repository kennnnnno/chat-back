import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/entities/auth';
import { User } from 'src/entities/users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async SignUp(id: string, password: string) {
    const existingUser = await this.userRepository.findOne({
      where: { user_id: id },
    });
    //すでに同じIDのユーザーが存在した場合
    if (existingUser) {
      throw new BadRequestException('この名前は既に使用されています');
    }
    //パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);
    // データベースに保存
    const user = this.userRepository.create({
      user_id: id,
      hash: hashedPassword,
      name: '名無し',
      greet: '',
    });
    return await this.userRepository.save(user);
  }
}
