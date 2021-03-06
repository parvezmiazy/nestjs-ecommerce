import { HttpStatus } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './../src/auth/auth.dto';
import 'dotenv/config';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
const app = 'http:localhost:3000';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URi);
  await mongoose.connection.db.dropDatabase();
});

afterAll(async (done) => {
  await mongoose.disconnect(done);
});
describe('Root', () => {
  it('should ping', () => {
    return request(app).get('/').expect(200).expect('Hello World!');
  });
});

describe('AUTH', () => {
  it('should register', () => {
    const user: RegisterDTO = {
      username: 'username',
      password: 'password',
    };

    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
        expect(body.user.password).toBeUndefined();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should reject duplicate registration', () => {
    const user: RegisterDTO = {
      username: 'username',
      password: 'password',
    };

    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.message).toEqual('User already exists');
        expect(body.code).toEqual(HttpStatus.BAD_REQUEST);
      })
      .expect(HttpStatus.CREATED);
  });

  it('should login', () => {
    const user: LoginDTO = {
      username: 'username',
      password: 'password',
    };

    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
        expect(body.user.password).toBeUndefined();
      })
      .expect(HttpStatus.CREATED);
  });
});
