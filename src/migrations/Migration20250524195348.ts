import { Migration } from '@mikro-orm/migrations';

export class Migration20250524195348 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`workflow\` add \`repeat_count\` int not null;`);
    this.addSql(`alter table \`workflow\` change \`repeat\` \`repeat_interval\` int not null default 1;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`workflow\` drop column \`repeat_count\`;`);

    this.addSql(`alter table \`workflow\` change \`repeat_interval\` \`repeat\` int not null default 1;`);
  }

}
