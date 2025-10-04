
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { Establishment } from '../establishment/entities/establishment.entity';
import * as dotenv from 'dotenv';
import { Status } from '../status/status.entity';
import { Category } from '../categorys/entities/category.entity';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { Product } from '../products/entities/product.entity';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: String(process.env.DATABASE_PASSWORD),
  database: process.env.DATABASE_NAME,
  entities: [User, Establishment, Status, Category, Ingredient, Product],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});
