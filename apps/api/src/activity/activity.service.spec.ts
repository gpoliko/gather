import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from './activity.service';
import { PrismaService } from '../prisma/prisma.service';
import { ActivityType } from '@prisma/client';

describe('ActivityService', () => {
  let service: ActivityService;
  let prisma: PrismaService;

  const mockPrismaService = {
    activity: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('createActivity', () => {
    it('should create an activity', async () => {
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
      };

      mockPrismaService.activity.create.mockResolvedValue(mockActivity);

      const result = await service.createActivity({
        type: ActivityType.CHILDREN_CLASS,
        name: 'Test Activity',
        location: 'Test Location',
        startDate: new Date(),
        user: { connect: { id: '1' } },
      });

      expect(result).toEqual(mockActivity);
      expect(prisma.activity.create).toHaveBeenCalled();
    });
  });
}); 