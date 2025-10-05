import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { RabbitMqService } from "../rabbitmq/rabbitmq.service";
import { EstablishmentService } from "./establishment.service";
import { RabbitEventsCreated } from "../rabbitmq/events/category/rabbitmq-created.config";
import { CreateEstablishmentDto } from "./dto/create-establishment.dto";

@Injectable()
export class EstablishmentConsumerService implements OnModuleInit {
  private readonly logger = new Logger(EstablishmentConsumerService.name);

  constructor(
    private readonly rabbitMqService: RabbitMqService,
    private readonly establishmentService: EstablishmentService,
  ) {}

  async onModuleInit() {
    const events = RabbitEventsCreated.ESTABLISHMENT_CREATED;
    
    await this.rabbitMqService.consume(
      events.exchange,
      events.queue,
      events.routingKey,

      async (msg: CreateEstablishmentDto) => {
        this.logger.log(`Mensagem recebida: ${msg.ownerId} - ${msg.name}`);
        try {
          await this.establishmentService.create(msg, msg.ownerId);
          this.logger.log(`Estabelecimento salvo no banco: ${msg.ownerId} - ${msg.name}`);
        } catch (err) {
          this.logger.error(`Erro ao salvar estabelecimento: ${err.message}`);
        }
      },
    );
  }
}
