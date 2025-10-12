# Quick Setup Guide

Follow these steps to get CollabVerse running locally:

## 1. Prerequisites Check

Make sure you have:
- ✅ Node.js 18 or higher (`node --version`)
- ✅ PostgreSQL running (`psql --version`)
- ✅ Git (optional)

## 2. Database Setup

### Option A: Local PostgreSQL

1. Create a new database:
```bash
psql -U postgres
CREATE DATABASE collabverse;
\q
```

2. Your DATABASE_URL will be:
```
postgresql://postgres:your_password@localhost:5432/collabverse?schema=public
```

### Option B: Hosted Database (Recommended for Quick Start)

Use a free tier from:
- [Neon](https://neon.tech) (Free PostgreSQL, no credit card)
- [Supabase](https://supabase.com) (Free tier)
- [Railway](https://railway.app) (Free trial)

Copy the connection string they provide.

## 3. Environment Configuration

Create `.env` file in the root directory:

```env
# Database - Replace with your actual PostgreSQL connection string
DATABASE_URL="postgresql://user:password@host:5432/collabverse?schema=public"

# Session Secret - Generate a random string (min 32 characters)
# You can use: openssl rand -base64 32
SESSION_SECRET="replace-with-a-long-random-string-at-least-32-characters"
```

**Generate a secure SESSION_SECRET**:
```bash
# On Mac/Linux:
openssl rand -base64 32

# Or use any random string generator, just make it 32+ characters
```

## 4. Install and Run

```bash
# Install dependencies
npm install

# Generate Prisma client and push schema to database
npm run postinstall
npx prisma db push

# Start development server
npm run dev
```

## 5. Test the Application

1. Open [http://localhost:3000](http://localhost:3000)
2. You'll be redirected to `/auth/sign-in`
3. Click "Sign up" to create an account
4. Use the locked-prefix handle input (e.g., `collabverse.io/yourhandle`)
5. After sign-up, you'll land on `/dashboard/my-store`

## 6. Explore Features

### My Store Tab
- Click **Edit** button (top-left of card) to customize
- **Content Tab**: Upload profile pic, add bio, social links, categories
- **Design Tab**: Upload banner, toggle Light/Dark theme
- Click **Preview** to see your store

### Other Tabs
- **Collabs**: Placeholder for collaboration features
- **Analytics**: Placeholder for analytics

## Common Issues

### "Failed to connect to database"
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env` is correct
- Test connection: `psql "your-connection-string"`

### "Session secret is too short"
- Ensure SESSION_SECRET in `.env` is at least 32 characters

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` and `.next`, then `npm install`

### Prisma errors
- Run `npx prisma generate`
- Run `npx prisma db push` to sync schema

## Database Management

View your data using Prisma Studio:
```bash
npx prisma studio
```

This opens a visual database browser at [http://localhost:5555](http://localhost:5555)

## Optional: Seed Data

To create a test account without using the UI:

```bash
npx prisma db seed
```

(Note: You'll need to create a seed script in `prisma/seed.ts` for this to work)

## Production Deployment

For production deployment:

1. Set up a production PostgreSQL database
2. Set environment variables on your hosting platform
3. Run migrations: `npx prisma migrate deploy`
4. Build: `npm run build`
5. Start: `npm start`

### Recommended Hosting
- **Vercel**: Best for Next.js (automatic deployments)
- **Railway**: Easy full-stack deployment
- **Fly.io**: Docker-based deployment

## Next Steps

- Integrate real file upload (AWS S3, Cloudinary, etc.)
- Add public store pages at `/:handle`
- Implement collaboration workflows
- Add email notifications
- Set up analytics tracking

## Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review the [Prisma Schema](./prisma/schema.prisma)
- Inspect API routes in `src/app/api/`

Happy coding! 🚀

