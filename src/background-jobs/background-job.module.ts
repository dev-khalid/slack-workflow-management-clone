import { Module } from '@nestjs/common';
import { WorkflowDispatcherModule } from './workflow-dispatcher/workflow-dispatcher.module';
import { BullModule } from '@nestjs/bullmq';
import { bullmqConfig } from './config';

@Module({
  imports: [BullModule.forRoot(bullmqConfig), WorkflowDispatcherModule],
})
export class BackgroundJobModule {}
