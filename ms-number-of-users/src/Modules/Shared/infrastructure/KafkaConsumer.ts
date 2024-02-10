import { Kafka, Consumer } from 'kafkajs';
import dotenv from 'dotenv';
import Logger from '../domain/Logger';
import WinstonLogger from './WinstoneLogger';

dotenv.config();

class KafkaConsumerService {
  private consumer: Consumer;
  private logger: Logger;

  constructor() {
    const kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID || 'default-client',
      brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
    });
    this.logger = new WinstonLogger();
    this.consumer = kafka.consumer({ groupId: 'group-default' });
  }

  public async start(): Promise<void> {
    
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'user.created.count', fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (message.value) {
        let transactionMessage: any;
        transactionMessage = JSON.parse(message.value.toString());
        console.log('transactionMessage =>', transactionMessage);
          try {
          } catch (error) {
            this.logger.error(`Error processing message: ${error}`);
          }
        }
      },
    });
  }
}

const kafkaConsumerService = new KafkaConsumerService();
//kafkaConsumerService.start().catch(console.error);

export default kafkaConsumerService;