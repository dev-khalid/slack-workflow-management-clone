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
      name: payload?.jobName || `${WORKFLOW_DISPATCHER_QUEUE}-job`,
      data: {
        workflowDefinition: payload.workflowDefinition,
      },
    };
    try {
    } catch (error) {}
    const scheduledJob = await this.workflowDispatcherQueue.upsertJobScheduler(
      payload.jobSchedulerId,
      {
        pattern: payload.pattern,
      },
      jobData,
    );

    console.log(`Job added to ${WORKFLOW_DISPATCHER_QUEUE}`, {
      jobId: scheduledJob?.id,
      jobSchedulerId: payload.jobSchedulerId,
      jobData,
    });
    return scheduledJob;
  }
}
