import { Migration } from '@mikro-orm/migrations';

export class Migration20250525035414 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`workflow\` modify \`repeat_count\` int null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`workflow\` modify \`repeat_count\` int not null;`);
  }

}
