import { RegisterDTO, LoginDTO } from './auth.dto';
import { UserService } from './../shared/user.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('login')
  async login(@Body() userDto: LoginDTO) {
    return await this.userService.findByLogin(userDto);
  }

  @Post('register')
  async register(@Body() userDto: RegisterDTO) {
    return await this.userService.create(userDto);
  }
}
