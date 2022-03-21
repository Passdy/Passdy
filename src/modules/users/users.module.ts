import { Module } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/users.entity';
import { UserRepository } from 'src/models/repositories/users.repository';
import { UsersController } from 'src/modules/users/users.controller';
import { MailService } from 'src/modules/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [UsersService, MailService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
