import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RabbitMqService } from '../rabbitmq/rabbitmq.service';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { RabbitEventsCreated } from '../rabbitmq/events/category/rabbitmq-created.config';

@Injectable()
export class CategoryConsumerService implements OnModuleInit {
  private readonly logger = new Logger(CategoryConsumerService.name);
  constructor(
    private readonly rabbitMqService: RabbitMqService,
    private readonly categorysService: CategorysService,
  ) {}

  async onModuleInit() {
    const events = RabbitEventsCreated.CATEGORY_CREATED;
    
    await this.rabbitMqService.consume(
      events.exchange,
      events.queue,
      events.routingKey,
      async (msg: CreateCategoryDto) => {
        this.logger.log('Mensagem recebida:', msg.userId);
        try {
          await this.categorysService.create(msg);
          this.logger.log('Categoria salva no banco', msg.userId);
        } catch (err) {
          this.logger.error('Erro ao salvar categoria:', err);
        }
      },
    );
  }
}
