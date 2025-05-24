import { BullRootModuleOptions } from '@nestjs/bullmq';
import { JobsOptions } from 'bullmq';

export const DefaultJobOptions: JobsOptions = {
  removeOnComplete: 10,
  removeOnFail: 10,
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 3000,
  },
};

export const bullmqConfig: BullRootModuleOptions = {
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME || 'default',
  },
};
