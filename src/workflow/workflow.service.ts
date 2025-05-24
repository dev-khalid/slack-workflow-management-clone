import { Injectable } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/workflow.dto';
import { EntityManager, FilterQuery, FindOptions } from '@mikro-orm/core';
import { Workflow } from './workflow.entity';

@Injectable()
export class WorkflowService {
  constructor(private readonly em: EntityManager) {}

  async addWorkflow(payload: CreateWorkflowDto) {
    // Prepare the payload and update the scheduleCronExpression if not provided.

    const workflow = this.em.create(Workflow, payload);

    await this.em.flush();

    // Take the name and the id and create the job-scheduler id.
    return workflow;
  }

  async getWorkflow() {
    // TODO: Implement pagination and filtering. Return single or multiple workflows from this method.
  }

  async updateWorkflow() {}

  async deleteWorkflow() {}
}
