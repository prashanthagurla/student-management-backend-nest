import { Module } from '@nestjs/common';
import { StudentModule } from './module/student.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvUploadModule } from './csv-upload/csv-upload.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    StudentModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    CsvUploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
