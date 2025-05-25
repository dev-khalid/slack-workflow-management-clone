import { Module } from '@nestjs/common';
import { WorkflowDispatcherModule } from './workflow-dispatcher/workflow-dispatcher.module';
import { BullModule } from '@nestjs/bullmq';
import { bullmqConfig } from './config';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import basicAuth from 'express-basic-auth';

@Module({
  imports: [
    BullModule.forRoot(bullmqConfig),
    BullBoardModule.forRoot({
      route: '/background-jobs-board',
      adapter: ExpressAdapter,
      middleware: basicAuth({
        users: { admin: process.env.BULL_BOARD_PASSWORD },
        challenge: true,
      }),
    }),
    WorkflowDispatcherModule,
  ],
})
export class BackgroundJobModule {}
