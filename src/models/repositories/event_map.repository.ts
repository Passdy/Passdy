import { EntityRepository, Repository } from 'typeorm';
import { EventMap, EventMapStatus } from 'src/models/entities/event_map.entity';

@EntityRepository(EventMap)
export class EventMapRepository extends Repository<EventMap> {
  async getListChildEventByEventId(eventId: number): Promise<number[]> {
    const eventMaps = await this.find({
      where: {
        event_id: eventId,
        status: EventMapStatus.Active,
      },
    });
    return eventMaps.map((e) => e.child_event_id);
  }
}
