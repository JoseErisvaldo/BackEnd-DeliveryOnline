import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMqService } from '../rabbitmq/rabbitmq.service';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryConsumerService implements OnModuleInit {
  constructor(
    private readonly rabbitMqService: RabbitMqService,
    private readonly categorysService: CategorysService,
  ) {}

  async onModuleInit() {
    await this.rabbitMqService.consume(
      'categorys-exchange',
      'fila-categorys',
      'category.criado',
      async (msg: CreateCategoryDto) => {
        console.log('💡 Mensagem recebida:', msg.userId);
        try {
          await this.categorysService.create(msg);
          console.log('Categoria salva no banco', msg.userId);
        } catch (err) {
          console.error('Erro ao salvar categoria:', err);
        }
      },
    );
  }
}
