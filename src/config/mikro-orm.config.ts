import { MySqlDriver } from '@mikro-orm/mysql';
import { MikroOrmModuleAsyncOptions, MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';
export const config: MikroOrmModuleAsyncOptions = {
  imports: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      entities: ['dist/**/*.entity.js'],
      entitiesTs: ['src/**/*.entity.ts'],
      dbName: configService.get('DB_NAME'),
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      user: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      driver: MySqlDriver,
    };
  },
};

const configSync: MikroOrmModuleSyncOptions = {};
