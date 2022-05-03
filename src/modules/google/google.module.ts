
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { GoogleStrategy } from './google.strategy'
import { UsersModule } from 'src/modules/users/users.module'
import { User } from 'src/models/entities/users.entity';
import { UserRepository } from 'src/models/repositories/users.repository';
import { jwtConstants } from 'src/modules/auth/constants';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            UserRepository,
        ]),
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '86400s' },
        }),
    ],
    controllers: [GoogleController],
    providers: [GoogleService, GoogleStrategy],
})
export class GoogleModule { }