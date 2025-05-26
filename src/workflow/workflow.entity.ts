import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { types } from '@mikro-orm/core';
import { ApiProperty, ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiMethods } from '../common/api-methods.enum';
import { RepeatFrequency, RepeatOn } from './config';

export class WorkflowDefinition {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  endpoint!: string;

  @ApiPropertyOptional({ enum: ApiMethods, default: ApiMethods.GET })
  @IsOptional()
  @Transform(({ value }) => value?.toUpperCase() || ApiMethods.GET)
  @IsEnum(ApiMethods)
  method?: ApiMethods;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  headers?: IUnsafeObject;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  body?: IUnsafeObject;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  queryParams?: IUnsafeObject;
}

@Entity()
export class Workflow {
  @ApiProperty()
  @PrimaryKey()
  id!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Property()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Property({ nullable: true })
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Property({ nullable: true })
  scheduleCronExpression?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Property({ type: types.string, nullable: true })
  scheduleTimeZone?: string;

  @ApiProperty({ type: WorkflowDefinition })
  @IsNotEmpty()
  @Type(() => WorkflowDefinition)
  @ValidateNested({ each: true })
  @Property({ type: types.json })
  workflowDefinition!: WorkflowDefinition;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsNumber()
  @Property({ type: types.integer, default: 1 })
  repeatInterval: number = 1;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Property({ type: types.integer, nullable: true })
  repeatCount?: number;

  @ApiPropertyOptional({ enum: RepeatFrequency, default: RepeatFrequency.DAILY })
  @IsOptional()
  @IsEnum(RepeatFrequency)
  @Enum({ items: () => RepeatFrequency, default: RepeatFrequency.DAILY })
  repeatFrequency: RepeatFrequency;

  @ApiPropertyOptional({ enum: RepeatOn, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(RepeatOn, { each: true })
  @Enum({ items: () => RepeatOn, array: true, nullable: true })
  repeatOn?: RepeatOn[];

  @ApiPropertyOptional({
    description:
      'Start date should contain start time as well in utc timezone. Example: 2025-10-01T12:30:00Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @Property({ nullable: true, type: types.date })
  repeatStartDate?: Date = new Date();

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @Property({ nullable: true, type: types.date })
  repeatEndDate?: Date;

  @ApiResponseProperty()
  @Property()
  jobSchedulerId: string;

  @ApiResponseProperty()
  @Property()
  createdAt: Date = new Date();

  @ApiResponseProperty()
  @Property({
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();
}
