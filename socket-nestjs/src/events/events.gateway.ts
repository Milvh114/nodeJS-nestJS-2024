// import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
// import { EventsService } from './events.service';
// import { CreateEventDto } from './dto/create-event.dto';
// import { UpdateEventDto } from './dto/update-event.dto';

// @WebSocketGateway()
// export class EventsGateway {
//   constructor(private readonly eventsService: EventsService) {}

//   @SubscribeMessage('createEvent')
//   create(@MessageBody() createEventDto: CreateEventDto) {
//     return this.eventsService.create(createEventDto);
//   }

//   @SubscribeMessage('findAllEvents')
//   findAll() {
//     return this.eventsService.findAll();
//   }

//   @SubscribeMessage('findOneEvent')
//   findOne(@MessageBody() id: number) {
//     return this.eventsService.findOne(id);
//   }

//   @SubscribeMessage('updateEvent')
//   update(@MessageBody() updateEventDto: UpdateEventDto) {
//     return this.eventsService.update(updateEventDto.id, updateEventDto);
//   }

//   @SubscribeMessage('removeEvent')
//   remove(@MessageBody() id: number) {
//     return this.eventsService.remove(id);
//   }
// }



import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}