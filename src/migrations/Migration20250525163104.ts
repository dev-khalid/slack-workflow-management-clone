import { Migration } from '@mikro-orm/migrations';

export class Migration20250525163104 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`workflow\` modify \`repeat_frequency\` enum('SECONDLY', 'MINUTELY', 'HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY') not null default 'DAILY';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`workflow\` modify \`repeat_frequency\` enum('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY') not null default 'DAILY';`);
  }

}
