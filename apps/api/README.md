# Core API Service 

A GraphQL API service built with NestJS for managing Bahá'í community building activities and participant engagement.

## Features
**User management**
- User registration and authentication
- Role-based access control (Admin/General)
- User profile management

**Activity management**
- Create and manage core activities:
  - Children's Classes
  - Junior Youth Groups
  - Study Circles 
  - Devotional Gatherings
- Track activity metrics 
- Location-based activity tracking

## Tech Stack
- **Framework**: NestJS
- **API**: GraphQL with Apollo Server
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport
- **Testing**: Jest SuperTest

## Project setup

Install the dependencies (if not already installed):
```bash
$ pnpm install
```

Generate the Prisma client:
```bash
$ pnpm prisma generate
```

Run database migrations:
```bash
$ pnpm prisma migrate dev
```

Seed the database:
```bash
$ pnpm prisma db seed
```

## Running the application 

```bash
# development
$ pnpm start

# watch mode
$ pnpm dev
```

## Running tests

```bash
# unit tests
$ pnpm test

# e2e tests
$ pnpm test:e2e

```