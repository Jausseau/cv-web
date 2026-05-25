# cv-web

Solid frontend for the CV website.

## Local Development

Install dependencies:

```shell
pnpm install
```

Run the frontend locally:

```shell
pnpm dev
```

The frontend expects the API at `http://localhost:8787` by default. Override it
with:

```shell
VITE_API_BASE_URL=https://your-api.example.com pnpm dev
```

Run checks:

```shell
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Deployment

Deployment is wired into CI but disabled by default. The `deploy` job runs only
when `CLOUDFLARE_DEPLOY_ENABLED` is set to `true`.

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Required GitHub repository variables:

- `CLOUDFLARE_DEPLOY_ENABLED=true`
- `CLOUDFLARE_PAGES_PROJECT_NAME=cv-web`
- `VITE_API_BASE_URL=https://your-worker-url.example`
