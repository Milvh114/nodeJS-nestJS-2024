import { Module } from '@nestjs/common';
import { DatabaseTypeormService } from './database-typeorm.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './data-source';
@Module({
  imports: [
    TypeOrmModule.forRootAsync(dataSource.options)
  ],
  providers: [DatabaseTypeormService],
  exports: [DatabaseTypeormService],
})
export class DatabaseTypeormModule {}
