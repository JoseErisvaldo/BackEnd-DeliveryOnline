import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { Category } from './entities/category.entity';
import { User } from '../users/user.entity';
import { RabbitMqService } from '../rabbitmq/rabbitmq.service';
import { CategoryConsumerService } from './category-consumer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, User])],
  providers: [CategorysService, RabbitMqService, CategoryConsumerService],
  controllers: [CategorysController],
})
export class CategorysModule {}
