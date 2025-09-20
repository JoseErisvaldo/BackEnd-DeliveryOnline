import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(pass, user.password);
    if (match) {
      const { password, ...result } = user as any;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string, name: string) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new UnauthorizedException("Email already in use");
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({ email, password: hashed, name: name });
    const { password: _, ...result } = user as any;
    return result;
  }
}
