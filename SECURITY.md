# Security

## Environment files

- Never commit `.env.local` or any real `.env*` file.
- Keep local secrets in environment files on your machine and in Vercel project settings.
- Keep `.env.example` placeholder-only.

## If a secret leaks

- Rotate the leaked secret immediately.
- Remove the secret from tracked files and commit history as needed.
- Re-deploy with the rotated value stored in environment variables only.

## Local guardrails

- Install the local pre-commit hook with `git config core.hooksPath .githooks`.
- Run `npm run secrets:scan` before pushing if you want a manual repo-wide check.
