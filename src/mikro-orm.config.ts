import { defineConfig, MySqlDriver, Options } from '@mikro-orm/mysql';
import { TSMigrationGenerator } from '@mikro-orm/migrations';


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
    tableName: 'migrations', 
    path: process.cwd() + '/src/migrations', 
    pathTs: undefined, 
    glob: '!(*.d).{js,ts}', 
    transactional: true, 
    disableForeignKeys: true, 
    allOrNothing: true, 
    dropTables: true, 
    safe: false, 
    snapshot: true, 
    emit: 'ts', 
    generator: TSMigrationGenerator,
  },
});
