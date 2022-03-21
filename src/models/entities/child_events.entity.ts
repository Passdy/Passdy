import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'child_events',
})
export class ChildEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  img: string;

  @Column()
  status: ChildEventStatus;
}

export enum ChildEventStatus {
  Active,
  Delete,
}
