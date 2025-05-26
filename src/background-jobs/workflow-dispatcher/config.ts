import { RegisterQueueOptions } from '@nestjs/bullmq';
import { DefaultJobOptions } from '../config';
import { rrulestr } from 'rrule';
import { RepeatOptions } from 'bullmq';

export const settings = {
  repeatStrategy: (millis: number, opts: RepeatOptions, _jobName: string) => {
    const currentDate =
      opts.startDate && new Date(opts.startDate) > new Date(millis)
        ? new Date(opts.startDate)
        : new Date(millis);

    const rrule = rrulestr(opts.pattern);

    if (rrule.origOptions.count && !rrule.origOptions.dtstart) {
      throw new Error('DTSTART must be defined to use COUNT with rrule');
    }

    const next_occurrence = rrule.after(currentDate, false);
    if(!next_occurrence) {
      console.warn('Nothing to schedule!')
    }

    return next_occurrence?.getTime();
  },
};

export const WORKFLOW_DISPATCHER_QUEUE = 'workflow-dispatcher-queue';

export const WorkflowDispatcherQueueConfig: RegisterQueueOptions = {
  name: WORKFLOW_DISPATCHER_QUEUE,
  defaultJobOptions: DefaultJobOptions,
  settings,
};
