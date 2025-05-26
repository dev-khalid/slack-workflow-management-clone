import { Migration } from '@mikro-orm/migrations';

export class Migration20250525235710 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`workflow\` modify \`description\` varchar(255) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`workflow\` modify \`description\` varchar(255) not null;`);
  }

}
