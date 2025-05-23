import { RegisterQueueOptions } from '@nestjs/bullmq';
import { DefaultJobOptions } from '../config';

export const WORKFLOW_DISPATCHER_QUEUE = 'workflow-dispatcher-queue';

export const WorkflowDispatcherQueueConfig: RegisterQueueOptions = {
  name: WORKFLOW_DISPATCHER_QUEUE,
  defaultJobOptions: DefaultJobOptions,
};
