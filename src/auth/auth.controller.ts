import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async getAuth(
    @Body('user_id') id: string,
    @Body('password') password: string,
  ) {
    return await this.authService.getAuth(id, password);
  }
}
