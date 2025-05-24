import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { types } from '@mikro-orm/core';
import { ApiProperty, ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Property()
  description!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Property({ nullable: true })
  scheduleCron?: string;

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
  repeat?: number;

  @ApiPropertyOptional({ enum: RepeatFrequency, default: RepeatFrequency.Daily })
  @IsOptional()
  @IsEnum(RepeatFrequency)
  @Enum({ items: () => RepeatFrequency, default: RepeatFrequency.Daily })
  repeatFrequency?: RepeatFrequency;

  @ApiPropertyOptional({ enum: RepeatOn, isArray: true })
  @IsNotEmpty()
  @IsArray()
  @IsEnum(RepeatOn, { each: true })
  @Enum({ items: () => RepeatOn, array: true })
  repeatOn: RepeatOn[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  @Property({ nullable: true, type: types.date })
  repeatStartDate?: Date = new Date();

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  @Property({ nullable: true, type: types.date })
  repeatEndDate?: Date;

  @ApiResponseProperty()
  @Property()
  createdAt: Date = new Date();

  @ApiResponseProperty()
  @Property({
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();
}
