import { Migration } from '@mikro-orm/migrations';

export class Migration20250520065542 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`workflow\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`description\` varchar(255) not null, \`schedule_cron\` varchar(255) not null, \`schedule_time_zone\` varchar(255) null, \`workflow_definition\` json not null, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`workflow\`;`);
  }

}
