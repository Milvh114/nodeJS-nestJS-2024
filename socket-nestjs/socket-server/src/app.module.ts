import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { EventsModule } from './events/events.module';
import { DatabaseModule } from './database/database.module';
import { CatsModule } from './cat/cat.module';
@Module({
  imports: [EventsModule, DatabaseModule, CatsModule],

})
export class AppModule {}
