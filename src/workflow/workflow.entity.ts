import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { types } from '@mikro-orm/core';

export interface IWorkflowDefinition {
  endpoint: string;
  method?: string;
  headers?: Record<string, string>;
  body?: Record<string, any>;
  queryParams?: Record<string, string>;
}
@Entity()
export class Workflow {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  description!: string;

  @Property()
  scheduleCron!: string;

  @Property({ type: types.string, nullable: true })
  scheduleTimeZone?: string;

  @Property({ type: types.json })
  workflowDefinition!: IWorkflowDefinition;

  @Property()
  createdAt: Date = new Date();

  @Property({
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();
}
