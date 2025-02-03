import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '@prisma/client';

import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  const mockPrismaService = {
    user: {
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
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        role: UserRole.GENERAL,
        locality: 'Test City',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.user.create.mockResolvedValue(mockUser);

      const result = await service.createUser({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        locality: 'Test City',
      });

      expect(result).toEqual(mockUser);
      expect(prisma.user.create).toHaveBeenCalled();
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
          role: UserRole.GENERAL,
          locality: 'Test City',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrismaService.user.findMany.mockResolvedValue(mockUsers);

      const result = await service.users({});

      expect(result).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });
  });
}); 