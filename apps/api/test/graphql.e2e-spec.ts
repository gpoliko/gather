import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { UserRole, ActivityType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { CREATE_USER, GET_USER, CREATE_ACTIVITY, GET_ACTIVITY } from './graphql/queries';

describe('GraphQL API (e2e)', () => {
  let app: INestApplication;

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    locality: 'Test City',
    role: UserRole.GENERAL,
    password: bcrypt.hashSync('password123', 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockActivity = {
    id: '1',
    type: ActivityType.CHILDREN_CLASS,
    name: 'Test Activity',
    location: 'Test Location',
    startDate: new Date(),
    userId: '1',
    participantCount: 0,
    bahaiCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: mockUser,
  };

  const mockPrismaService = {
    user: {
      create: jest.fn().mockImplementation((data) => {
        return Promise.resolve({
          ...mockUser,
          email: data.data.email,
          name: data.data.name,
          locality: data.data.locality,
          role: data.data.role,
          activities: [],
        });
      }),
      findUnique: jest.fn().mockImplementation(({ where }) => {
        if (where.id === '1' || where.email === 'test@example.com') {
          return Promise.resolve({
            ...mockUser,
            activities: [],
          });
        }
        return Promise.resolve(null);
      }),
    },
    activity: {
      create: jest.fn().mockResolvedValue(mockActivity),
      findUnique: jest.fn().mockImplementation(({ where }) => {
        if (where.id === '1') {
          return Promise.resolve(mockActivity);
        }
        return Promise.resolve(null);
      }),
      findMany: jest.fn().mockResolvedValue([]),
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(PrismaService)
    .useValue(mockPrismaService)
    .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('User Operations', () => {
    it('should create and fetch a user', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: CREATE_USER,
          variables: {
            input: {
              email: 'test@example.com',
              password: 'password123',
              name: 'Test User',
              locality: 'Test City',
              role: UserRole.GENERAL,
            },
          },
        });

      expect(createResponse.status).toBe(200);
      console.log('Create Response:', createResponse.body);
      expect(createResponse.body.data.createUser).toBeDefined();
      const userId = createResponse.body.data.createUser.id;

      const queryResponse = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: GET_USER,
          variables: { id: userId },
        });

      expect(queryResponse.status).toBe(200);
      console.log('Query Response:', queryResponse.body);
      expect(queryResponse.body.data.user).toBeDefined();
      expect(queryResponse.body.data.user.email).toBe('test@example.com');
    });
  });

  describe('Activity Operations', () => {
    let userId: string;

    beforeEach(async () => {
      const createUserResponse = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: CREATE_USER,
          variables: {
            input: {
              email: 'test@example.com',
              password: 'password123',
              name: 'Test User',
              locality: 'Test City',
              role: UserRole.GENERAL
            },
          },
        });

      userId = createUserResponse.body.data.createUser.id;
    });

    it('should create and fetch an activity', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: CREATE_ACTIVITY,
          variables: {
            input: {
              type: ActivityType.CHILDREN_CLASS,
              name: 'Test Activity',
              location: 'Test Location',
              startDate: new Date().toISOString(),
              userId: userId
            },
          },
        });

      expect(createResponse.status).toBe(200);
      if (createResponse.body.errors) {
        console.error('GraphQL Errors:', createResponse.body.errors);
      }
      expect(createResponse.body.data.createActivity).toBeDefined();
      const activityId = createResponse.body.data.createActivity.id;

      const queryResponse = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: GET_ACTIVITY,
          variables: { id: activityId },
        });

      expect(queryResponse.status).toBe(200);
      expect(queryResponse.body.data.activity).toBeDefined();
      expect(queryResponse.body.data.activity.name).toBe('Test Activity');
      expect(queryResponse.body.data.activity.user.id).toBe(userId);
    });
  });
});