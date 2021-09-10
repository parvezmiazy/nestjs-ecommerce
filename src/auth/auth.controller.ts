import { RegisterDTO, LoginDTO } from './auth.dto';
import { UserService } from './../shared/user.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService,
    private authService:AuthService) {}


  @Get()
  @UseGuards(AuthGuard('jwt'))
  tempAuth(){
    return {auth:'works'};
  }


  @Post('login')
  async login(@Body() userDto: LoginDTO) {

   const user = await this.userService.findByLogin(userDto);
   const payload = {
     username:user.username,
     seller:user.seller,
   };
   const token = await this.authService.signPayload(payload);
   return {user,token}
  }

  @Post('register')
  async register(@Body() userDto: RegisterDTO) {

    const user =  await this.userService.create(userDto);

    const payload = {
      username:user.username,
      seller:user.seller,
    };
    const token = await this.authService.signPayload(payload);


     return {user,token}
  }
}
