# Domino

Turborepo containing:

- `@domino/api`: Hono API
- `@domino/web`: Next.js app
- `@domino/ui`: shared React components
- `@domino/typescript-config`: shared TypeScript configuration

## Development

```bash
bun install
bun dev
```

## Checks

```bash
bun run lint
bun run check-types
bun run build
```

Format the repository with `bun run format`.
