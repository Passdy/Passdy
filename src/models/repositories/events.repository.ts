import { EntityRepository, Repository } from 'typeorm';
import { Event, EventStatus } from 'src/models/entities/events.entity';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
  async getListEventActive(): Promise<Event[]> {
    return await this.find({
      where: {
        status: EventStatus.Active,
      },
      order: {
        id: 'DESC',
      },
    });
  }
}
