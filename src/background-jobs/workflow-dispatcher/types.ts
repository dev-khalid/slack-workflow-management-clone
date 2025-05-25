import { WorkflowDefinition } from 'src/workflow/workflow.entity';

export interface IWorkflowDispatcherJobData {
  workflowDefinition: WorkflowDefinition;
}

export interface IWorkflowDispatcherJobSchedulerData extends IWorkflowDispatcherJobData {
  pattern: string;
  jobSchedulerId: string;
  jobName?: string;
}
