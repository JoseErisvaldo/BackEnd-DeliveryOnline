// src/database/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { Establishment } from '../establishment/entities/establishment.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'nestjs_auth',
  entities: [User, Establishment],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  
});
