# Focuz Studios CRM

Vercel-ready photography studio CRM interface built with Next.js, React, TypeScript and Tailwind CSS.

## Run locally

1. Install Node.js 22.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

## Upload to GitHub

Create a new empty GitHub repository, extract this ZIP, and open the folder in VS Code. Then run:

```bash
git init
git add .
git commit -m "Initial Focuz Studios CRM"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Deploy to Vercel

1. Sign in to Vercel and select **Add New → Project**.
2. Import the GitHub repository.
3. Vercel will detect **Next.js** automatically.
4. Keep the default build command `npm run build`.
5. Select **Deploy**.

## Current scope

This package contains the complete working frontend prototype. Data currently runs in browser state and resets after refresh. Connect Firebase, Supabase or another database before using it as a production multi-user CRM.
