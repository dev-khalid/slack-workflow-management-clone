import { Migration } from '@mikro-orm/migrations';

export class Migration20250525064857 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`workflow\` modify \`repeat_frequency\` enum('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY') not null default 'DAILY', modify \`repeat_on\` text;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`workflow\` modify \`repeat_frequency\` tinyint not null default 3, modify \`repeat_on\` text;`);
  }

}
