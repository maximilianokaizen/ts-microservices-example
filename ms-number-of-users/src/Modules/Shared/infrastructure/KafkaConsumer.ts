import { Kafka, Consumer } from 'kafkajs';
import dotenv from 'dotenv';
import Logger from '../domain/Logger';
import WinstonLogger from './WinstoneLogger';
import { UsersService } from '../../User/application/services/UsersService';
dotenv.config();

class KafkaConsumerService {
  private consumer: Consumer;
  private logger: Logger;
  private userService: UsersService;
  constructor() {
    const kafka = new Kafka({
      clientId: 'default-client',
      brokers: ['localhost:9092']
    });
    this.logger = new WinstonLogger();
    this.consumer = kafka.consumer({ groupId: 'group-default-2' });
    this.userService = new UsersService();
  }

  public async start(): Promise<void> {

    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: 'newuser', fromBeginning: true });
      console.log('Connected and subscribed successfully');
    } catch (error) {
      console.error('Error connecting or subscribing:', error);
      return; 
    }
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (message.value) {
          let eventPayload: any;
          eventPayload = JSON.parse(message.value.toString());
          console.log(' eventPayload =>',  eventPayload);
          try {
            this.userService.addNewUser();
          } catch (error) {
            this.logger.error(`Error adding new user ${error}`);
          }
        }
        try {
        } catch (error) {
          this.logger.error(`Error processing message: ${error}`);
        }
      }
    });
  }
}

const kafkaConsumerService = new KafkaConsumerService();

export default kafkaConsumerService;
