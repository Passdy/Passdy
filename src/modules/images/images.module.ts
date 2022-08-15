import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/models/entities/image.entity';
import { ImageRepository } from 'src/models/repositories/images.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Image,
      ImageRepository,
    ]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}
