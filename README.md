# Gather
> NB: Currently in very early stages of development.

Gather is an application for the Baha'i community to record community building activity statistics, generate insights, and encourage new approaches for collective community growth.

It has been a challenge for the Baha'i community to seamlessly and intuitively record and analyze statistics on their community building efforts. This application aims to help with that.

## Prerequisites
- Node.js 18+
- pnpm
- Docker
- Database Tool for Postgres (e.g. TablePlus, DBeaver, etc.)

## Usage

Install the dependencies:
```bash
pnpm install
```

## Setting up the Environment (FOR EXPLORING AND TESTING ONLY)
This will create an `.env` file in the `apps/api` directory to use for testing out the application.
> NB: This is only for testing out the application, and is not used in production.
```bash
pnpm setup:env
```

## Running the Applications
> NB: Have Docker running before starting the application.

Running both the API and Web applications:
```bash
pnpm turbo dev
```

### Developing & Testing the API Application
[API app specifics](apps/api/README.md)

### Developing &Testing the Web Application
[Web app specifics](apps/web/README.md)

## TODO
- [x] Add Nest Application
- [x] Add and configure Prisma
- [x] Add GraphQL
- [ ] Build out the API (in progress)
- [ ] Build out the UI

