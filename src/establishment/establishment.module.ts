import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Establishment } from "./entities/establishment.entity";
import { EstablishmentService } from "./establishment.service";
import { EstablishmentController } from "./establishment.controller";
import { UsersModule } from "../users/users.module";
import { User } from "../users/user.entity";
import { EstablishmentRepository } from "./establishment.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([Establishment, User]),
    forwardRef(() => UsersModule),
  ],
  controllers: [EstablishmentController],
  providers: [
    EstablishmentService,
    {
      provide: EstablishmentRepository,
      useClass: EstablishmentRepository,
    },
  ],
  exports: [EstablishmentRepository],
})
export class EstablishmentModule {}
