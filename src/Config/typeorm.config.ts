import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/Database/Migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
  dropSchema: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);

export async function dropDatabaseSchema() {
  const dataSource = new DataSource(config as DataSourceOptions);
  await dataSource.initialize();
  console.log('Dropping database schema...');
  await dataSource.dropDatabase();
  await dataSource.destroy();
  console.log('Database schema dropped successfully.');
}
