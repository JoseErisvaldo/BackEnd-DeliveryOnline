// users.module.ts
import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { EstablishmentModule } from "../establishment/establishment.module";
import { Establishment } from "../establishment/entities/establishment.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Establishment]),
    forwardRef(() => EstablishmentModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
