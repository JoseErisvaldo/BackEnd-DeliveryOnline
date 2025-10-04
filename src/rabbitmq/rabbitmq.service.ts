import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import { Connection, Channel } from 'amqplib';

@Injectable()
export class RabbitMqService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection;
  private channel: Channel;
  private readonly amqpUrl: string;

  constructor(private readonly configService: ConfigService) {
    const user = this.configService.get<string>('RABBITMQ_USER');
    const pass = this.configService.get<string>('RABBITMQ_PASS');
    const host = this.configService.get<string>('RABBITMQ_HOST');
    const port = this.configService.get<string>('RABBITMQ_PORT') || '5672';

    const cloudUrl = this.configService.get<string>('CLOUDAMQP_URL');
    this.amqpUrl = cloudUrl || `amqp://${user}:${pass}@${host}:${port}`;
  }

  async onModuleInit() {
    await this.connect();
  }

  private async connect() {
    if (!this.connection) {
      try {
        this.connection = await amqp.connect(this.amqpUrl);
        this.channel = await this.connection.createChannel();
        console.log('✅ Conectado ao RabbitMQ com sucesso!');
      } catch (err) {
        console.error('❌ Erro ao conectar no RabbitMQ:', err);
        throw err;
      }
    }
  }

  private async ensureChannel(): Promise<Channel> {
    if (!this.channel) {
      await this.connect();
    }
    return this.channel;
  }

  async sendMessage(exchange: string, routingKey: string, message: unknown) {
    const channel = await this.ensureChannel();
    await channel.assertExchange(exchange, 'direct', { durable: true });

    const buffer = Buffer.from(JSON.stringify(message));
    channel.publish(exchange, routingKey, buffer, { persistent: true });

    console.log(
      `📤 Mensagem enviada -> Exchange: "${exchange}" | RoutingKey: "${routingKey}"`,
    );
  }

  async consume(
    exchange: string,
    queue: string,
    routingKey: string,
    callback: (msg: any) => void,
  ) {
    const channel = await this.ensureChannel();

    await channel.assertExchange(exchange, 'direct', { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, routingKey);

    channel.consume(queue, (msg) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        callback(content);
        channel.ack(msg);
      }
    });

    console.log(
      `📥 Consumindo mensagens da fila "${queue}" vinculada à exchange "${exchange}"`,
    );
  }

  async onModuleDestroy() {
    try {
      await this.channel?.close();
      await this.connection?.close();
      console.log('🛑 Conexão com RabbitMQ encerrada com sucesso');
    } catch (err) {
      console.error('⚠️ Erro ao fechar conexão RabbitMQ:', err);
    }
  }
}
