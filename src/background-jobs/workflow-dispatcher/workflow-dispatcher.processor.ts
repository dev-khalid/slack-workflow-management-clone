import { Processor, WorkerHost } from '@nestjs/bullmq';
import { WORKFLOW_DISPATCHER_QUEUE } from './config';

@Processor(WORKFLOW_DISPATCHER_QUEUE)
export class WorkflowDispatcherProcessor extends WorkerHost {
  constructor() {
    super();
  }

  async process(job) {
    // We will do a fake api call as placeholder here.
    
  }
}
