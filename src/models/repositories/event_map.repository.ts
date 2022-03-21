import { EntityRepository, Repository } from 'typeorm';
import { EventMap } from 'src/models/entities/event_map.entity';

@EntityRepository(EventMap)
export class EventMapRepository extends Repository<EventMap> {}
