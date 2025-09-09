# Mindforge

A modern, collaborative, AI-powered productivity app.

## Features
- Real-time chat, tasks, summaries
- AI/voice integration
- Theming, accessibility, PWA
- SQLite/Drizzle, REST API, OpenAPI docs

## Getting Started
- `pnpm install`
- `pnpm dev`

## Testing
- `pnpm test` (Jest)
- `pnpm cypress run` (E2E)


## Production Deployment

### Environment Variables
Set these in your cloud provider (Render, Vercel) or in `.env.local` for local testing:

- `JWT_SECRET` (required for backend security)
- `NEXT_PUBLIC_API_URL` (frontend: URL to backend API)

### Deploying Backend (Render)
1. Push your code to GitHub.
2. Go to https://render.com/ and create a new Web Service.
3. Set root to `apps/backend`.
4. Set build command: `npm install`
5. Set start command: `npm run start` or your custom script.
6. Add environment variables.
7. Deploy and test your backend URL.

### Deploying Frontend (Vercel)
1. Push your code to GitHub.
2. Go to https://vercel.com/ and create a new project.
3. Set root to `apps/frontend`.
4. Vercel auto-detects Next.js.
5. Add environment variables.
6. Deploy and test your frontend URL.

## Production Readiness Checklist
- [x] No secrets in code
- [x] Dependencies up to date
- [x] Error handling in API and frontend
- [x] Logging set up in backend
- [x] Documentation and setup instructions
- [x] Environment variables managed securely
- [x] Dockerfile and build scripts cloud-compatible
- [x] Frontend is responsive and polished

## Docs
- API: `/api/docs`

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md)
