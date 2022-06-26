import { defaultConfig } from './configs/database.config';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  ...defaultConfig,
  logging: true,
  logger: 'file',
  migrationsTableName: 'migrate_tables',
  synchronize: true,
  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    // location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/models/entities'
  },
  seeds: ['src/seeds/**/*{.ts,.js}'],
  factories: ['src/factories/**/*{.ts,.js}'],
};

export = config;
