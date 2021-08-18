import { userStub } from './../stubs/users.stub';
import { DatabaseService } from './../../../database/database.service';
import { AppModule } from './../../../app.module';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from "supertest";


describe('UsersController', () => {
    let dbConnection: Connection;
    let httpServer: any;
    let app: any;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();

        dbConnection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle();
        httpServer = app.getHttpServer();
    });

    afterAll(async () => {
        await dbConnection.collection('users').deleteMany({});
        await app.close();
    });

    describe('getUsers', () => {
        it('Should return an array of users ', async () => {
            await dbConnection.collection('users').insertOne(userStub());
            const response = await request(httpServer).get('/users');

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([userStub()]);
        });
    });
});