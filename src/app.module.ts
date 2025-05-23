import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BackgroundJobModule } from './background-jobs/background-job.module';
import { mikroOrmConfig } from './mikro-orm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import validationSchema from './config/env-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: validationSchema,
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync(mikroOrmConfig),
  , BackgroundJobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
