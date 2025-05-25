import { Injectable } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/workflow.dto';
import { EntityManager } from '@mikro-orm/core';
import { Workflow } from './workflow.entity';
import { cronExpressionGenerator } from './cron-expression-generator';

@Injectable()
export class WorkflowService {
  constructor(private readonly em: EntityManager) {}

  prepareJobSchedulerId(name: string): string {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000).toString();
    return `${name}-${randomSuffix}`;
  }
  async addWorkflow(payload: CreateWorkflowDto) {
    // Prepare the payload and update the scheduleCronExpression if not provided.

    const workflow = this.em.create(Workflow, payload);

    workflow.jobSchedulerId = this.prepareJobSchedulerId(workflow.name);

    const recurrenceRule = cronExpressionGenerator(payload);

    workflow.scheduleCronExpression = recurrenceRule.text;

    await this.em.flush();

    return workflow;
  }

  async getWorkflow() {
    // TODO: Implement pagination and filtering. Return single or multiple workflows from this method.
  }

  async updateWorkflow() {}

  async deleteWorkflow() {}
}
