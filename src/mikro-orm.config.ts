import { defineConfig, MySqlDriver, Options } from '@mikro-orm/mysql';
import { MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TSMigrationGenerator } from '@mikro-orm/migrations';

// export const mikroOrmConfig: MikroOrmModuleAsyncOptions = {
//   imports: [ConfigModule],
//   useFactory: (configService: ConfigService) => {
//     const config: Options = {
//       entities: ['dist/**/*.entity.js'],
//       entitiesTs: ['src/**/*.entity.ts'],
//       dbName: configService.get('DB_NAME'),
//       host: configService.get('DB_HOST'),
//       port: +configService.get('DB_PORT'),
//       user: configService.get('DB_USER'),
//       password: configService.get('DB_PASSWORD'),
//       forceUtcTimezone: true,
//       driver: MySqlDriver,
//       debug: true,
//       migrations: {
//         tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
//         path: './migrations', // path to the folder with migrations
//         pathTs: undefined, // path to the folder with TS migrations (if used, you should put path to compiled files in `path`)
//         glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
//         transactional: true, // wrap each migration in a transaction
//         disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
//         allOrNothing: true, // wrap all migrations in master transaction
//         dropTables: true, // allow to disable table dropping
//         safe: false, // allow to disable table and column dropping
//         snapshot: true, // save snapshot when creating new migrations
//         emit: 'ts', // migration generation mode
//         generator: TSMigrationGenerator,
//       },
//     };
//     return config;
//   },
//   inject: [ConfigService],
// };

export default defineConfig({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  forceUtcTimezone: true,
  driver: MySqlDriver,
  debug: true,
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: process.cwd() + '/src/migrations', // path to the folder with migrations
    pathTs: undefined, // path to the folder with TS migrations (if used, you should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: true, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
    generator: TSMigrationGenerator,
  },
});
