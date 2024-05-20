import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CatsController } from './cat.controller';
import { CatsService } from './cat.service';
import { catsProviders } from './cat.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CatsController],
  providers: [CatsService, ...catsProviders],
})
export class CatsModule {}