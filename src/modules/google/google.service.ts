import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { google, Auth } from 'googleapis';
import { UsersService } from 'src/modules/users/users.service'
import { UserResponseErrorKey } from 'src/modules/users/users.const';
import { GoogleLoginDto } from './google.dto'
import { Exception } from 'handlebars';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleService {
    oauthClient: Auth.OAuth2Client;
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {
        const clientID = process.env.GOOGLE_AUTH_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_AUTH_CLIENT_SECRET;

        this.oauthClient = new google.auth.OAuth2(
            clientID,
            clientSecret
        );
    }

    async login(googleLoginDto: GoogleLoginDto) {
        const token = googleLoginDto['accessToken'];
        const tokenInfo = await this.oauthClient.getTokenInfo(token);
        if (!tokenInfo) {
            throw new HttpException(
                { key: UserResponseErrorKey.InvalidUser },
                HttpStatus.BAD_REQUEST,
            );
        }
        const email = tokenInfo.email;

        const user = await this.usersService.findOne(email);
        if (user) {
            return await this.handleRegisteredUser(user);
        }
        const newUser = await this.registerUser(token, email)
        return this.handleRegisteredUser(newUser.data);

    }

    async getUserData(token: string) {
        const userInfoClient = google.oauth2('v2').userinfo;
        this.oauthClient.setCredentials({
            access_token: token
        })
        const userInfoResponse = await userInfoClient.get({
            auth: this.oauthClient
        });
        return userInfoResponse.data;
    }

    getTokenGoogle(req) {
        if (!req.user) {
            return 'No user from google'
        }
        return {
            message: 'User information from google',
            user: req.user
        }
    }

    async handleRegisteredUser(user: any) {
        if (!user.is_registered_with_google) {
            throw new HttpException(
                { key: UserResponseErrorKey.InvalidUser },
                HttpStatus.BAD_REQUEST,
            );
        }
        return {
            id: user.id,
            role: user.role,
            balance: user.balance,
            full_name: user.full_name,
            address: user.address,
            email: user.email,
            phone: user.phone,
            created_at: user.created_at,
            status: user.status,
            expire_code: user.expire_code,
            is_registered_with_google: user.is_registered_with_google,
            access_token: this.jwtService.sign({
                email: user.email, sub: user.id
            }),
        };

    }
    async registerUser(token: string, email: string) {
        const userData = await this.getUserData(token);
        const name = userData.name;
        const user = await this.usersService.createWithGoogle(email, name);
        return user;
    }
}