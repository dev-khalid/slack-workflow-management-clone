import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { WorkflowDispatcherQueueConfig } from './config';

@Global()
@Module({
  imports: [BullModule.registerQueue(WorkflowDispatcherQueueConfig)],
  providers: [],
  exports: [],
})
export class WorkflowDispatcherModule {}
