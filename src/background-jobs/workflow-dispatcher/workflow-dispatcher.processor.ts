import { Processor, WorkerHost } from '@nestjs/bullmq';
import { settings, WORKFLOW_DISPATCHER_QUEUE } from './config';
import { Job } from 'bullmq';
import { IWorkflowDispatcherJobData } from './types';

@Processor(WORKFLOW_DISPATCHER_QUEUE, { settings })
export class WorkflowDispatcherProcessor extends WorkerHost {
  constructor() {
    super();
  }

  async process(job: Job<IWorkflowDispatcherJobData>) {
    // We will do a fake api call as placeholder here.
  }
}
