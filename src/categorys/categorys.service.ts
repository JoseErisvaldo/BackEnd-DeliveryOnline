// src/categorys/categorys.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { User } from '../users/user.entity';

@Injectable()
export class CategorysService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateCategoryDto & { userId: string }) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new Error('Usuário não encontrado');

    const category = this.categoryRepo.create({
      name: dto.name,
      user,
    });

    return await this.categoryRepo.save(category);
  }
}
