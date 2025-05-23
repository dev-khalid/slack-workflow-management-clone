import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BackgroundJobModule } from './background-jobs/background-job.module';

@Module({
  imports: [MikroOrmModule.forRoot(), BackgroundJobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
