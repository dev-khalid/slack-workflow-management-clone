import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { types } from '@mikro-orm/core';
import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiMethods } from 'src/common/api-methods.enum';

export class WorkflowDefinition {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  endpoint!: string;

  @ApiPropertyOptional({ enum: ApiMethods })
  @IsOptional()
  @Transform(({ value }) => value?.toUpperCase())
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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Property()
  scheduleCron!: string;

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

  @ApiResponseProperty()
  @Property()
  createdAt: Date = new Date();

  @ApiResponseProperty()
  @Property({
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();
}
