import { Migration } from '@mikro-orm/migrations';

export class Migration20250525063957 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`workflow\` modify \`repeat_frequency\` tinyint not null default 3, modify \`repeat_on\` text null;`);
    this.addSql(`alter table \`workflow\` change \`schedule_cron\` \`schedule_cron_expression\` varchar(255) null;`);
    this.addSql(`alter table \`workflow\` change \`job_scheduler_name\` \`job_scheduler_id\` varchar(255) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`workflow\` modify \`repeat_frequency\` enum('daily', 'weekly', 'monthly', 'yearly', 'hourly') not null default 'daily', modify \`repeat_on\` text not null;`);
    this.addSql(`alter table \`workflow\` change \`schedule_cron_expression\` \`schedule_cron\` varchar(255) null;`);
    this.addSql(`alter table \`workflow\` change \`job_scheduler_id\` \`job_scheduler_name\` varchar(255) not null;`);
  }

}
