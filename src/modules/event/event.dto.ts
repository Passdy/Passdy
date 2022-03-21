import { IsNotEmpty } from 'class-validator';
import { EventStatus } from 'src/models/entities/events.entity';
import { ChildEventStatus } from 'src/models/entities/child_events.entity';
export class CreateEventDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  display_type: string;

  content: string;

  list_child_event_id: number[];

  status: EventStatus;
}

export class CreateChildEventDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  title: string;

  content: string;

  img: string;
  status: ChildEventStatus;
}
