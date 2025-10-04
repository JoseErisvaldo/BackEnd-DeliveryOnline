// src/categorys/categorys.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategorysService } from './categorys.service';

@Controller('categorys')
export class CategorysController {
  constructor(private readonly categorysService: CategorysService) {}

  @Post()
  create(@Body() body: { name: string; userId: string }) {
    return this.categorysService.create(body);
  }

}
