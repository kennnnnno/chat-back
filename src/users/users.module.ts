import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users';
import { Auth } from 'src/entities/auth';

@Module({
  imports: [TypeOrmModule.forFeature([User, Auth])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
