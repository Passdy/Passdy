import { EntityRepository, In, Like, Repository } from "typeorm";
import {
  ChildEvent,
  ChildEventStatus,
} from 'src/models/entities/child_events.entity';

@EntityRepository(ChildEvent)
export class ChildEventRepository extends Repository<ChildEvent> {
  async getListChildEvent(
    page: number,
    size: number,
    name,
    title,
    content,
  ): Promise<ChildEvent[]> {
    const condition = {
      status: ChildEventStatus.Active,
    };
    if (name) condition['name'] = Like(`%${name}%`);
    if (title) condition['title'] = Like(`%${title}%`);
    if (content) condition['content'] = Like(`%${content}%`);
    return await this.find({
      where: condition,
      skip: (page - 1) * size,
      take: size,
      order: {
        id: 'DESC',
      },
    });
  }

  async getListChildByIds(ids: number[]): Promise<ChildEvent[]> {
    return await this.find({
      where: {
        id: In(ids),
      },
    });
  }

  async getChildEventById(id: number): Promise<ChildEvent> {
    return await this.findOne({
      where: {
        id: id,
      },
    });
  }
}
