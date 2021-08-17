import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from "dotenv";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

dotenv.config();
@Module({
    imports: [
        MongooseModule.forRoot(
            `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.vqq92.mongodb.net/nestjs_integration_tests`,
            {
                autoCreate: true
            }
        ),
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
