import { FileInterceptor } from '@nestjs/platform-express';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Response as Rs,
  Delete,
} from '@nestjs/common';
import { UserID } from 'src/shares/decorators/get-user-id.decorator';
import { Response } from 'src/shares/interceptors/response.interceptor';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { EventService } from 'src/modules/event/event.service';
import {
  CreateChildEventDto,
  CreateEventDto,
} from 'src/modules/event/event.dto';
import { ChildEvent } from 'src/models/entities/child_events.entity';
import { Event } from 'src/models/entities/events.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer = require('multer');

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'src/upload',
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'src/upload');
        },
        filename: (req, file, cb) => {
          const names = file.originalname.split('.');
          cb(null, `${new Date().getTime()}.${names[names.length - 1]}`);
        },
      }),
    }),
  )
  @Post('child')
  async createChildEvent(
    @UserID() userId: number,
    @Body() createChildEventDto: CreateChildEventDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Response<ChildEvent>> {
    return await this.eventService.createChildEvent(
      userId,
      createChildEventDto,
      file,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('child')
  async getListChildEvent(
    @Query() query,
    @UserID() userId: number,
  ): Promise<Response<ChildEvent[]>> {
    return await this.eventService.getListChildEvent(
      userId,
      query.page,
      query.size,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createEvent(
    @UserID() userId: number,
    @Body() createEventDto: CreateEventDto,
  ): Promise<Response<Event>> {
    return await this.eventService.createEvent(userId, createEventDto);
  }

  @Get()
  async getEvent(): Promise<Response<any[]>> {
    return await this.eventService.getEvent();
  }

  @Get('get-image')
  async getImage(
    @Query() param: { image_path: string },
    @Rs() res,
  ): Promise<any> {
    return await this.eventService.getImage(param.image_path, res);
  }

  @Delete()
  async deleteEvent(@Query() param: { id: number }): Promise<boolean> {
    return await this.eventService.deleteEvent(param.id);
  }
}
