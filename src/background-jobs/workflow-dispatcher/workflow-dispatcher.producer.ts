import { Injectable } from '@nestjs/common';
import { IWorkflowDispatcherJobData, IWorkflowDispatcherJobSchedulerData } from './types';
import { InjectQueue } from '@nestjs/bullmq';
import { WORKFLOW_DISPATCHER_QUEUE } from './config';
import { Queue } from 'bullmq';

@Injectable()
export class WorkflowDispatcherProducer {
  constructor(
    @InjectQueue(WORKFLOW_DISPATCHER_QUEUE)
    private readonly workflowDispatcherQueue: Queue<IWorkflowDispatcherJobData>,
  ) {}

  async registerWorkflowDispatchJob(payload: IWorkflowDispatcherJobSchedulerData) {
    const jobData = {
      name: 'cron-job',
      data: {
        workflowDefinition: payload.workflowDefinition,
      },
    };

    const scheduledJob = await this.workflowDispatcherQueue.upsertJobScheduler(
      payload.jobSchedulerId,
      {
        pattern: payload.pattern,
      },
      jobData,
    );

    return scheduledJob;
  }
}
