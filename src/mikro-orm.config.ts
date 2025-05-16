import { MySqlDriver, Options } from '@mikro-orm/mysql';
import { MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { ConfigModule, ConfigService } from '@nestjs/config';
export const mikroOrmConfig: MikroOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    const config: Options = {
      entities: ['dist/**/*.entity.js'],
      entitiesTs: ['src/**/*.entity.ts'],
      dbName: configService.get('DB_NAME'),
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      user: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      driver: MySqlDriver,
      // metadataProvider: TsMorphMetadataProvider,
      debug: true,
    };
    return config;
  },
  inject : [ConfigService],
};
