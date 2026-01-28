import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
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

  @Get()
  async verify(@Req() request: Request) {
    const authHeader = request.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('トークンが見つかりません。');
    }

    return await this.authService.verifyToken(token);
  }
}
