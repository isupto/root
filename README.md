# is-up.to — root site

Marketing site, docs and legal pages for `is-up.to` and `www.is-up.to` (`www` redirects to the apex).

Built with Next.js APIs on [vinext](https://github.com/cloudflare/vinext), shadcn/ui (Base UI) and Tailwind CSS 4. Every route is prerendered at build time and served from Workers Static Assets.

## Develop

```sh
pnpm install
cp .env.example .env.local   # optional: point links at a local service
pnpm dev
```

## Build and deploy

```sh
pnpm build        # prerenders all routes
pnpm start        # serve the production build locally
pnpm deploy       # build and deploy to Cloudflare Workers
pnpm typecheck
```

Deploys need `cf auth login` or `CLOUDFLARE_API_TOKEN` plus `CLOUDFLARE_ACCOUNT_ID`. The Worker binds the `is-up.to` and `www.is-up.to` custom domains (see `cloudflare.config.ts`).

## Notes

- Icons and images come from `https://static.is-up.to` (the `assets` repo).
- Plan limits in `lib/plans.ts` and the API reference in `lib/api-reference.ts` describe behaviour implemented in the `service` repo. Change them together.
- shadcn components use Base UI (`base-nova`). Avoid the `radix-ui` barrel package: vinext 1.0.0's server build hangs while analysing it.
