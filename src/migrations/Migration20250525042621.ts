import { Migration } from '@mikro-orm/migrations';

export class Migration20250525042621 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`workflow\` add \`job_scheduler_name\` varchar(255) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`workflow\` drop column \`job_scheduler_name\`;`);
  }

}
