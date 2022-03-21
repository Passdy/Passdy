import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'events',
})
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  display_type: string;

  @Column()
  status: EventStatus;
}

export enum EventStatus {
  Active,
  Delete,
}
