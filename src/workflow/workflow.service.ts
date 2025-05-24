import { Injectable } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/workflow.dto';
import { EntityManager, FilterQuery, FindOptions } from '@mikro-orm/core';
import { Workflow } from './workflow.entity';

@Injectable()
export class WorkflowService {
  constructor(private readonly em: EntityManager) {}

  async addWorkflow(payload: CreateWorkflowDto) {
    const workflow = this.em.create(Workflow, payload);
    await this.em.persistAndFlush(workflow);
    return workflow;
  }

  async getWorkflow() {
    // TODO: Implement pagination and filtering. Return single or multiple workflows from this method.
  }

  async updateWorkflow() {}

  async deleteWorkflow() {}
}
