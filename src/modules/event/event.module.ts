import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/users.entity';
import { UserRepository } from 'src/models/repositories/users.repository';
import { Event } from 'src/models/entities/events.entity';
import { EventRepository } from 'src/models/repositories/events.repository';
import { ChildEvent } from 'src/models/entities/child_events.entity';
import { ChildEventRepository } from 'src/models/repositories/child_events.repository';
import { EventMap } from 'src/models/entities/event_map.entity';
import { EventMapRepository } from 'src/models/repositories/event_map.repository';
import { EventService } from 'src/modules/event/event.service';
import { EventController } from 'src/modules/event/event.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRepository,
      Event,
      EventRepository,
      ChildEvent,
      ChildEventRepository,
      EventMap,
      EventMapRepository,
    ]),
  ],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
