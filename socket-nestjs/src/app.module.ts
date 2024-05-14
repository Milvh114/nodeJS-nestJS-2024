import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EventsModule } from './events/events.module';


@Module({
  imports: [ EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
