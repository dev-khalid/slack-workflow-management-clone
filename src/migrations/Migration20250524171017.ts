import { Migration } from '@mikro-orm/migrations';

export class Migration20250524171017 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`workflow\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`description\` varchar(255) not null, \`schedule_cron\` varchar(255) null, \`schedule_time_zone\` varchar(255) null, \`workflow_definition\` json not null, \`repeat\` int not null default 1, \`repeat_frequency\` enum('daily', 'weekly', 'monthly', 'yearly', 'hourly') not null default 'daily', \`repeat_on\` text not null, \`repeat_start_date\` date null, \`repeat_end_date\` date null, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`workflow\`;`);
  }

}
