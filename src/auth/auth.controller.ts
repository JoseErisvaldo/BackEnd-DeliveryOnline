import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";

class RegisterDto {
  email: string;
  password: string;
  name: string;
}

class LoginDto {
  email: string;
  password: string;
}

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body() body: RegisterDto) {
    if (!body.email || !body.password || !body.name)
      throw new BadRequestException("email, password and name required");
    return this.authService.register(body.email, body.password, body.name);
  }

  @Post("login")
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new BadRequestException("invalid credentials");
    return this.authService.login(user);
  }
}
