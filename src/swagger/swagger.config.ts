import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Slack Workflow Management')
  .setDescription('Slack Workflow Management Clone API')
  .setVersion('1.0')
  .build();
