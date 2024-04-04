import { Module } from '@nestjs/common';
import { DatabaseTypeormService } from './database-typeorm.service';

@Module({
  providers: [DatabaseTypeormService],
  exports: [DatabaseTypeormService],
})
export class DatabaseTypeormModule {}
