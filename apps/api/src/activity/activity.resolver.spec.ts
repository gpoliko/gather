import { Test, TestingModule } from '@nestjs/testing';
import { ActivityResolver } from './activity.resolver';
import { ActivityService } from './activity.service';
import { ActivityType } from '@prisma/client';

describe('ActivityResolver', () => {
  let resolver: ActivityResolver;
  let service: ActivityService;

  const mockActivityService = {
    activities: jest.fn(),
    activity: jest.fn(),
    createActivity: jest.fn(),
    updateActivity: jest.fn(),
    deleteActivity: jest.fn(),
    getActivityUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityResolver,
        {
          provide: ActivityService,
          useValue: mockActivityService,
        },
      ],
    }).compile();

    resolver = module.get<ActivityResolver>(ActivityResolver);
    service = module.get<ActivityService>(ActivityService);
  });

  describe('createActivity', () => {
    it('should create an activity', async () => {
      const createActivityInput = {
        type: ActivityType.CHILDREN_CLASS,
        name: 'Test Activity',
        location: 'Test Location',
        startDate: new Date(),
        userId: '1',
      };

      const mockActivity = {
        id: '1',
        ...createActivityInput,
        participantCount: 0,
        bahaiCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockActivityService.createActivity.mockResolvedValue(mockActivity);

      const result = await resolver.createActivity(createActivityInput);

      expect(result).toEqual(mockActivity);
      expect(service.createActivity).toHaveBeenCalledWith({
        type: ActivityType.CHILDREN_CLASS,
        name: 'Test Activity',
        location: 'Test Location',
        startDate: createActivityInput.startDate,
        user: { connect: { id: '1' } },
      });
    });
  });
}); 