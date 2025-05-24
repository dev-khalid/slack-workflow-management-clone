import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { types } from '@mikro-orm/core';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';

export class WorkflowDefinition {
  @IsNotEmpty()
  @IsString()
  endpoint!: string;

  @IsOptional()
  @IsString()
  method?: string;

  @IsOptional()
  @IsObject()
  headers?: Record<string, string>;

  @IsOptional()
  @IsObject()
  body?: Record<string, any>;

  @IsOptional()
  @IsObject()
  queryParams?: Record<string, string>;
}
@Entity()
export class Workflow {
  @IsOptional()
  @PrimaryKey()
  id!: number;

  @IsNotEmpty()
  @IsString()
  @Property()
  name!: string;

  @IsNotEmpty()
  @IsString()
  @Property()
  description!: string;

  @IsNotEmpty()
  @IsString()
  @Property()
  scheduleCron!: string;

  @IsOptional()
  @IsString()
  @Property({ type: types.string, nullable: true })
  scheduleTimeZone?: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => WorkflowDefinition)
  @Property({ type: types.json })
  workflowDefinition!: WorkflowDefinition;

  @Property()
  createdAt: Date = new Date();

  @Property({
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();
}
