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

Deployment is intentionally not enabled yet. Once the Cloudflare Pages project
and repository secrets are configured, add a deployment workflow that calls:

```yaml
uses: Jausseau/platform-ci/.github/workflows/cloudflare-pages-deploy.yml@master
```

Required GitHub secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
