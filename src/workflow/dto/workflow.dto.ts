// TODO: This should be coming from the database model itself.
// Use nest/mapping types.
// Use openapi decorators to generate the swagger documentation.
// Use class-validator decorators to validate the data.

import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Workflow } from '../workflow.entity';

export class CreateWorkflowDto extends OmitType(Workflow, ['id', 'createdAt', 'updatedAt'] as const) {}

export class UpdatedWorkflowDto extends PartialType(CreateWorkflowDto) {}
