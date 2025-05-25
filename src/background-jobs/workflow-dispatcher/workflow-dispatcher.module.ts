import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { WORKFLOW_DISPATCHER_QUEUE, WorkflowDispatcherQueueConfig } from './config';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { WorkflowDispatcherProducer } from './workflow-dispatcher.producer';
@Global()
@Module({
  imports: [
    BullModule.registerQueue(WorkflowDispatcherQueueConfig),
    BullBoardModule.forFeature({
      name: WORKFLOW_DISPATCHER_QUEUE,
      adapter: BullMQAdapter,
    }),
  ],
  providers: [WorkflowDispatcherProducer, WorkflowDispatcherProducer],
  exports: [WorkflowDispatcherProducer],
})
export class WorkflowDispatcherModule {}
