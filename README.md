# Hacklab Kuopio ry Website

Official website for [Hacklab Kuopio ry](https://hacklab.fi/), built with [Payload CMS](https://payloadcms.com/) and [Next.js](https://nextjs.org/).

## Requirements

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [pnpm](https://pnpm.io/) (package manager)
- [PostgreSQL](https://www.postgresql.org/) database

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hacklab-kuopio/halko_web.git
cd halko_web
```

### 2. Install dependencies

Verify that node is installed:

```bash
pnpm env use --global lts
```

Install dependencies

```bash
pnpm install
```

### 3. Configure environment

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` and set the required environment variables (database connection, etc.).

### 4. Start development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command         | Description               |
| --------------- | ------------------------- |
| `pnpm dev`      | Start development server  |
| `pnpm build`    | Build for production      |
| `pnpm start`    | Start production server   |
| `pnpm lint`     | Run ESLint                |
| `pnpm lint:fix` | Run ESLint with auto-fix  |
| `pnpm test`     | Run all tests             |
| `pnpm test:int` | Run integration tests     |
| `pnpm test:e2e` | Run end-to-end tests      |
| `pnpm format`   | Format code with Prettier |

## Deployment

Each site is deployed separately from this same codebase, distinguished by the `HOSTNAME`
environment variable (`halko.fi`, `kuosec.fi`, `savosec.fi`). Coolify builds with Nixpacks
(`NIXPACKS_NODE_VERSION` in the environment); there is no Dockerfile.

### Required: scheduled jobs cron

**Every site needs a scheduled task calling the Payload job queue, or scheduled publishing
silently does nothing.** The admin will accept a publish date, queue the job, and show a
success toast — but without a runner the document never publishes and no error is logged.

Add a Coolify scheduled task per site, running every minute:

```bash
curl -fsS -H "Authorization: Bearer $CRON_SECRET" https://<site-hostname>/api/payload-jobs/run
```

`CRON_SECRET` must be set in that site's environment; the endpoint's access check lives in
`src/payload.config.ts`. This has to run over HTTP rather than as an in-process cron: the
Payload hooks that invalidate the Next.js cache only take effect inside a request, so a job
run outside one would publish to the database while the site kept serving the stale page.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **CMS:** Payload CMS 3.x
- **Database:** PostgreSQL
- **Styling:** TailwindCSS
- **UI Components:** shadcn/ui
- **Language:** TypeScript

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

See [LICENSE](LICENSE) for details.
