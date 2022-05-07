
import { Controller, Get, Request, UseGuards, Post, Body } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleLoginDto } from './google.dto'
import { AuthGuard } from '@nestjs/passport';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) { }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req) { }

  @Post('login')
  googleLogin(@Body() googleLoginDto: GoogleLoginDto) {
    return this.googleService.login(googleLoginDto)
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req) {
    return this.googleService.getTokenGoogle(req)
  }
}