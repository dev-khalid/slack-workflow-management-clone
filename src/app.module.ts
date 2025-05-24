import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BackgroundJobModule } from './background-jobs/background-job.module';
import mikroOrmConfig  from './mikro-orm.config';
import { ConfigModule } from '@nestjs/config';
import validationSchema from './config/env-schema';
import { WorkflowModule } from './workflow/workflow.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: validationSchema,
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(mikroOrmConfig),
    BackgroundJobModule,
    WorkflowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
