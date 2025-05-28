# Dynamic cron scheduler

A simple project that replicates the functionality of managing workflows in Slack. Built with NestJS, this application enables automated workflow management with scheduled API calls and background job processing.

## Features

- Workflow automation and scheduling
- API call management with cron expressions
- Background job processing (BullMQ)
- RESTful API with Swagger docs
- MySQL database (MikroORM)

## Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- MySQL
- Redis

## Setup

1. Install dependencies:

```bash
nvm use
npm install
```

2. Configure environment:

- Create a `.env` file
- Add database and Redis settings

## Running

```bash
docker-compose up    # Development
```

Visit `/swagger` for Swagger documentation.

## Testing

```bash
npm test            # Run tests
npm run test:e2e    # E2E tests
```
