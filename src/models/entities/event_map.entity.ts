import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'event_map',
})
export class EventMap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event_id: number;

  @Column()
  child_event_id: number;

  @Column()
  status: EventMapStatus;
}

export enum EventMapStatus {
  Active,
  Delete,
}
