import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { WorkflowDispatcherQueueConfig } from './config';

@Module({
  imports: [BullModule.registerQueue(WorkflowDispatcherQueueConfig)],
  providers: [],
  exports: [],
})
export class WorkflowDispatcherModule {}
