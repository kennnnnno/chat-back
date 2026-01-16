import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users';
import { Auth } from 'src/entities/auth';

@Module({
  imports: [TypeOrmModule.forFeature([User, Auth])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
