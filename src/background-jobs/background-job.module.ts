import { Module } from '@nestjs/common';
import { WorkflowDispatcherModule } from './workflow-dispatcher/workflow-dispatcher.module';

@Module({
  imports: [WorkflowDispatcherModule],
})
export class BackgroundJobModule {}
