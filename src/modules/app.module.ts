import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { AppDataSource } from '../database/data-source';
import { CategorysModule } from '../categorys/categorys.module';
import { ProductsModule } from '../products/products.module';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(AppDataSource.options),
    UsersModule,
    AuthModule,
    CategorysModule,
    ProductsModule,
    IngredientsModule,
  ]
})
export class AppModule {}
