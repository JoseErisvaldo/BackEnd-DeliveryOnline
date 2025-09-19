import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../auth/auth.module";
import { User } from "../users/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST || "localhost",
      port: Number(process.env.DATABASE_PORT || 5432),
      username: process.env.DATABASE_USER || "postgres",
      password: process.env.DATABASE_PASSWORD || "postgres",
      database: process.env.DATABASE_NAME || "nestjs_auth",
      entities: [User],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
