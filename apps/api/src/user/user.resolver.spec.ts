import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '@prisma/client';

import { CreateUserInput, UpdateUserInput } from './user.input';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  const mockUserService = {
    users: jest.fn(),
    user: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    getUserActivities: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserInput: CreateUserInput = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        locality: 'Test City',
        role: UserRole.GENERAL,
      };

      const mockUser = {
        id: '1',
        ...createUserInput,
        createdAt: new Date(),
        updatedAt: new Date(),
        activities: [],
      };

      mockUserService.createUser.mockResolvedValue(mockUser);

      const result = await resolver.createUser(createUserInput);

      expect(result).toEqual(mockUser);
      expect(service.createUser).toHaveBeenCalledWith(createUserInput);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userId = '1';
      const updateUserInput: UpdateUserInput = {
        name: 'Updated Name',
        locality: 'Updated City',
      };

      const mockUpdatedUser = {
        id: userId,
        email: 'test@example.com',
        password: 'password123',
        name: 'Updated Name',
        locality: 'Updated City',
        role: UserRole.GENERAL,
        createdAt: new Date(),
        updatedAt: new Date(),
        activities: [],
      };

      mockUserService.updateUser.mockResolvedValue(mockUpdatedUser);

      const result = await resolver.updateUser(userId, updateUserInput);

      expect(result).toEqual(mockUpdatedUser);
      expect(service.updateUser).toHaveBeenCalledWith({
        where: { id: userId },
        data: updateUserInput,
      });
    });
  });

  describe('users', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        {
          id: '1',
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
          locality: 'Test City',
          role: UserRole.GENERAL,
          createdAt: new Date(),
          updatedAt: new Date(),
          activities: [],
        },
      ];

      mockUserService.users.mockResolvedValue(mockUsers);

      const result = await resolver.users();

      expect(result).toEqual(mockUsers);
      expect(service.users).toHaveBeenCalledWith({});
    });
  });

  describe('activities field resolver', () => {
    it('should return user activities', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
      };

      const mockActivities = [
        {
          id: '1',
          name: 'Test Activity',
          type: 'CHILDREN_CLASS',
          userId: '1',
        },
      ];

      mockUserService.getUserActivities.mockResolvedValue(mockActivities);

      const result = await resolver.activities(mockUser as any);

      expect(result).toEqual(mockActivities);
      expect(service.getUserActivities).toHaveBeenCalledWith(mockUser.id);
    });
  });
}); 