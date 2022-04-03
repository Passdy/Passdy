// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/models/entities/users.entity';
import { UserRepository } from 'src/models/repositories/users.repository';
import { Event, EventStatus } from 'src/models/entities/events.entity';
import { EventRepository } from 'src/models/repositories/events.repository';
import {
  ChildEvent,
  ChildEventStatus,
} from 'src/models/entities/child_events.entity';
import { ChildEventRepository } from 'src/models/repositories/child_events.repository';
import { EventMap, EventMapStatus } from 'src/models/entities/event_map.entity';
import { EventMapRepository } from 'src/models/repositories/event_map.repository';
import {
  CreateChildEventDto,
  CreateEventDto,
} from 'src/modules/event/event.dto';
import { Response } from 'src/shares/interceptors/response.interceptor';
import { EventResponseErrorKey } from 'src/modules/event/event.const';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: EventRepository,
    @InjectRepository(ChildEvent)
    private childEventRepository: ChildEventRepository,
    @InjectRepository(EventMap)
    private eventMapRepository: EventMapRepository,
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async createChildEvent(
    userId: number,
    createChildEventDto: CreateChildEventDto,
    file: Express.Multer.File,
  ): Promise<Response<ChildEvent>> {
    const user = await this.userRepository.findOne(userId);
    if (!user || user.role !== UserRole.Admin) {
      throw new HttpException(
        {
          key: EventResponseErrorKey.NoPermission,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!createChildEventDto.name) {
      throw new HttpException(
        {
          key: EventResponseErrorKey.MissingEventName,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!createChildEventDto.title) {
      throw new HttpException(
        {
          key: EventResponseErrorKey.MissingEventTitle,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!file) {
      throw new HttpException(
        {
          key: EventResponseErrorKey.MissingImage,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    createChildEventDto.img = file.path;
    createChildEventDto.status = ChildEventStatus.Active;
    const newChildEvent = await this.childEventRepository.save(
      createChildEventDto,
    );
    return {
      data: newChildEvent,
      metadata: null,
    };
  }

  async updateChildEvent(
    userId: number,
    createChildEventDto: CreateChildEventDto,
    file: Express.Multer.File,
  ): Promise<Response<boolean>> {
    await this.isAdmin(userId);
    const childEvent = await this.childEventRepository.getChildEventById(
      createChildEventDto.id,
    );
    childEvent.name = createChildEventDto.name;
    childEvent.title = createChildEventDto.title;
    childEvent.content = createChildEventDto.content;
    if (file) {
      fs.unlinkSync(childEvent.img);
      childEvent.img = file.path;
    }
    await this.childEventRepository.save(childEvent);
    return {
      data: true,
      metadata: null,
    };
  }

  async isAdmin(userId: number): Promise<void> {
    const user = await this.userRepository.getUserById(userId);
    if (!user || user.role !== UserRole.Admin) {
      throw new HttpException(
        {
          message: 'No permission',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  async deleteChildEvent(id: number): Promise<Response<boolean>> {
    const childEvent = await this.childEventRepository.getChildEventById(id);
    try {
      fs.unlinkSync(childEvent.img);
      await this.childEventRepository.delete({ id: id });
      return {
        data: true,
        metadata: null,
      };
    } catch (err) {
      throw new HttpException(
        {
          message: 'INTERNAL SERVER',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getListChildEvent(
    userId: number,
    page = 1,
    size = 100,
    name: string,
    title: string,
    content: string,
  ): Promise<Response<ChildEvent[]>> {
    await this.isAdmin(userId);
    const events = await this.childEventRepository.getListChildEvent(
      page,
      size,
      name,
      title,
      content,
    );
    return {
      data: events,
      metadata: null,
    };
  }

  async createEvent(
    userId: number,
    createEventDto: CreateEventDto,
  ): Promise<Response<Event>> {
    const user = await this.userRepository.findOne(userId);
    if (!user || user.role !== UserRole.Admin) {
      throw new HttpException(
        {
          key: EventResponseErrorKey.NoPermission,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!createEventDto.name) {
      throw new HttpException(
        {
          key: EventResponseErrorKey.MissingEventName,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!createEventDto.title) {
      throw new HttpException(
        {
          key: EventResponseErrorKey.MissingEventTitle,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!createEventDto.display_type) {
      throw new HttpException(
        {
          key: EventResponseErrorKey.NoDisplayType,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const listChildEvent = await this.childEventRepository.getListChildByIds(
      createEventDto.list_child_event_id,
    );
    const event = new Event();
    event.name = createEventDto.name;
    event.title = createEventDto.title;
    event.content = createEventDto.content;
    event.display_type = createEventDto.display_type;
    const newEvent = await this.eventRepository.save(event);
    const eventMap = [];
    for (const childEvent of listChildEvent) {
      const newEventMap = new EventMap();
      newEventMap.event_id = newEvent.id;
      newEventMap.child_event_id = childEvent.id;
      newEventMap.status = EventMapStatus.Active;
      eventMap.push(newEventMap);
    }
    await this.eventMapRepository.save(eventMap);
    return {
      data: newEvent,
      metadata: null,
    };
  }

  async getEvent(): Promise<Response<any[]>> {
    const dataReturn = [];
    const listEvent = await this.eventRepository.getListEventActive();
    for (const event of listEvent) {
      const listChildEventIds =
        await this.eventMapRepository.getListChildEventByEventId(event.id);
      const listChildEvent = await this.childEventRepository.getListChildByIds(
        listChildEventIds,
      );
      dataReturn.push({
        event: event,
        listChildEvent: listChildEvent,
      });
    }
    return {
      data: dataReturn,
      metadata: null,
    };
  }

  async getImage(imagePath: string, res): Promise<any> {
    fs.readFile(imagePath, function (err, content) {
      if (err) {
        res.writeHead(400, { 'Content-type': 'text/html' });
        res.end('No such image');
      } else {
        res.writeHead(200, { 'Content-type': 'image/jpg' });
        res.end(content);
      }
    });
  }

  async deleteEvent(idEvent: number): Promise<boolean> {
    const event = await this.eventRepository.findOne(idEvent);
    if (!event) {
      throw new HttpException(
        {
          message: 'No event found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    event.status = EventStatus.Delete;
    await this.eventRepository.save(event);
    return true;
  }
}
