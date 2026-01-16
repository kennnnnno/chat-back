import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async SignUp(
    @Body('user_id') id: string,
    @Body('password') password: string,
  ) {
    return await this.usersService.SignUp(id, password);
  }
}
