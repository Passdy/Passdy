import { EntityRepository, In, Repository } from "typeorm";
import {
  ChildEvent,
  ChildEventStatus,
} from 'src/models/entities/child_events.entity';

@EntityRepository(ChildEvent)
export class ChildEventRepository extends Repository<ChildEvent> {
  async getListChildEvent(page: number, size: number): Promise<ChildEvent[]> {
    return await this.find({
      where: {
        status: ChildEventStatus.Active,
      },
      skip: (page - 1) * size,
      take: size,
    });
  }

  async getListChildByIds(ids: number[]): Promise<ChildEvent[]> {
    return await this.find({
      where: {
        id: In(ids),
      },
    });
  }
}
