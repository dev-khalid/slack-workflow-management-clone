import { Processor, WorkerHost } from '@nestjs/bullmq';
import { settings, WORKFLOW_DISPATCHER_QUEUE } from './config';
import { Job } from 'bullmq';
import { IWorkflowDispatcherJobData } from './types';
import fakeApi from '@src/common/fake-api-call';

@Processor(WORKFLOW_DISPATCHER_QUEUE, { settings, concurrency: 20 })
export class WorkflowDispatcherProcessor extends WorkerHost {
  constructor() {
    super();
  }

  async process(job: Job<IWorkflowDispatcherJobData>) {
    // We will do a fake api call as placeholder here.
    console.log(`${WORKFLOW_DISPATCHER_QUEUE} processing: `, { jobId: job.id });

    const result = await fakeApi({ data: job.data });

    console.log(`${WORKFLOW_DISPATCHER_QUEUE} job processed.`, {
      jobId: job.id,
    });
    return result;
  }
}
