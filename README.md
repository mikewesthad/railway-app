# Railway Creation Flow

This is my take on the prompt: 
> Build an application to spin up and spin down a container using our GQL API.

The advances in AI tooling likely mean more people trying to deploy their code to production (e.g. vibe coding). The main take in this app is that AI tooling can help make it easier to get started, so this introduces a Railway AI assistant creation flow.

## Demos

AI Assistant Creation Flow:

https://github.com/user-attachments/assets/f6439c25-fc2b-40d0-a8c0-8a7563e851d5

You can also deploy via a full screen template experience:

https://github.com/user-attachments/assets/e0633aa5-d028-430d-81b1-fd32cc3cdc66

AI Assistant Debugging:

https://github.com/user-attachments/assets/b8ef695c-5f2c-45f9-a5bb-901395df41a0

## Overview

Tools:
- Next.js
- Apollo
- Auth0
- Prisma

Project structure:
- `src/` - source code for the Next app
  - `prisma/` - generated DB client
  - `components/` - mini design library of shared components
  - `app/`
    - `api/` - server APIs
    - everything else :D
- `scripts/` - test scripts for AI tooling development
- `codegen/` - source for codegen config for typing Railway's API + the Next GQL API calls
- `primsa/` - migrations & prisma config

This is more of a proof of concept than a production-ready app, so there are a few things that I would improve to take this to production, e.g.
- supporting multiple workspaces
- responsive design pass
- move Next server's API from REST to GQL
- rate limiting
- AI debugging for logs, proof-of-concept worked in `DeploymentLogs` component, but was cut for time
- etc.

## Setup

Make sure your environment has the following env variables:

```
# Used for gql codegen
RAILWAY_API_KEY=
# Prisma DB
DATABASE_URL=
# AI tooling
OPENAI_API_KEY=
# Auth0 config
AUTH0_SECRET=
APP_BASE_URL=
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
```


## Development 

Run:

```bash
pnpm dev
```

And then open [http://localhost:3000](http://localhost:3000).
