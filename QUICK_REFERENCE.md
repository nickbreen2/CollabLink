# CollabVerse - Quick Reference

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up .env file
cp .env.example .env
# Edit .env with your DATABASE_URL and SESSION_SECRET

# 3. Initialize database
npx prisma db push

# 4. Start development server
npm run dev

# 5. Open http://localhost:3000
```

---

## 🔑 Environment Variables

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/collabverse"
SESSION_SECRET="min-32-chars-random-string"
```

Generate SESSION_SECRET:
```bash
openssl rand -base64 32
```

---

## 📦 Common Commands

### Development
```bash
npm run dev              # Start dev server (port 3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

### Database
```bash
npx prisma studio        # Open database GUI (port 5555)
npx prisma generate      # Generate Prisma client
npx prisma db push       # Sync schema to database (dev)
npx prisma migrate dev   # Create migration (dev)
npx prisma migrate deploy # Apply migrations (prod)
npx prisma db seed       # Run seed script (if exists)
```

### Troubleshooting
```bash
rm -rf .next node_modules    # Clean build
npm install                   # Reinstall
npx prisma generate          # Regenerate client
```

---

## 🗂️ Project Structure

```
Key Directories:
├── /src/app            → Pages & API routes
├── /src/components     → React components  
├── /src/lib            → Utils & config
├── /prisma             → Database schema
└── /public             → Static assets
```

---

## 🛣️ Routes

### Public Routes
- `/` → Redirects to `/auth/sign-in`
- `/auth/sign-in` → Sign in page
- `/auth/sign-up` → Sign up page

### Protected Routes (requires auth)
- `/dashboard` → Redirects to `/dashboard/my-store`
- `/dashboard/my-store` → Store customization
- `/dashboard/collabs` → Collaborations (placeholder)
- `/dashboard/analytics` → Analytics (placeholder)

### API Routes
- `POST /api/auth/sign-up` → Create account
- `POST /api/auth/sign-in` → Sign in
- `POST /api/auth/sign-out` → Sign out
- `GET /api/store` → Get store
- `PATCH /api/store` → Update store
- `POST /api/upload` → Upload image

---

## 🎨 Key Components

### Custom Components
```tsx
<HandleInput />              // Locked prefix input
<StorePreviewCard />         // Store preview
<StoreCardToggle />          // Edit/Preview button
<Banner />                   // Banner with fade
<EditPanel />                // Content/Design tabs
<ContentForm />              // Content editor
<DesignForm />               // Design editor
<DashboardNav />             // Dashboard sidebar
```

### UI Components (shadcn/ui)
```tsx
<Button />
<Input />
<Label />
<Textarea />
<Avatar />
<Tabs />
<Toast />
```

---

## 🔐 Authentication Flow

```typescript
// Sign up
POST /api/auth/sign-up
  → Create User + CreatorStore
  → Create session
  → Redirect to /dashboard/my-store

// Sign in  
POST /api/auth/sign-in
  → Verify credentials
  → Create session
  → Redirect to /dashboard/my-store

// Check auth (server-side)
import { requireAuth } from '@/lib/auth'
const session = await requireAuth()
```

---

## 💾 Database Operations

### Using Prisma Client
```typescript
import { prisma } from '@/lib/prisma'

// Create
await prisma.user.create({
  data: { email, passwordHash }
})

// Read
await prisma.creatorStore.findUnique({
  where: { userId }
})

// Update
await prisma.creatorStore.update({
  where: { userId },
  data: { displayName }
})

// Delete
await prisma.user.delete({
  where: { id }
})
```

---

## ✅ Validation Schemas

```typescript
import { SignUpSchema, StoreUpdateSchema } from '@/lib/validations'

// Validate sign-up
const result = SignUpSchema.safeParse(data)
if (!result.success) {
  // Handle errors
}

// Validate store update
const result = StoreUpdateSchema.safeParse(data)
```

---

## 🎨 Theming

### Apply Theme
```typescript
onUpdate({ theme: 'LIGHT' })  // or 'DARK'
```

### Banner Gradient
```tsx
<Banner 
  src={bannerUrl} 
  theme={store.theme}  // LIGHT or DARK
/>
```

---

## 📤 File Upload

### Client-side
```typescript
const formData = new FormData()
formData.append('file', file)

const res = await fetch('/api/upload', {
  method: 'POST',
  body: formData
})

const { url } = await res.json()
```

### Validation
- Max 2MB
- JPG, PNG, WebP only
- Checked on client & server

---

## 🐛 Common Issues & Fixes

### Database Connection Failed
```bash
# Check PostgreSQL is running
pg_ctl status

# Test connection
psql "your-database-url"

# Reset connection
npx prisma db push --force-reset
```

### Session Errors
```bash
# Check SESSION_SECRET length (min 32 chars)
# Clear browser cookies
# Restart dev server
```

### Build Errors
```bash
# Clean and rebuild
rm -rf .next
npm run build
```

### Prisma Errors
```bash
# Regenerate client
npx prisma generate

# Sync schema
npx prisma db push
```

---

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] Set production DATABASE_URL
- [ ] Set secure SESSION_SECRET (32+ chars)
- [ ] Run `npm run build` successfully
- [ ] Test all routes
- [ ] Check environment variables

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set env vars in Vercel dashboard
DATABASE_URL=...
SESSION_SECRET=...
```

### Database Migration
```bash
# Create migration
npx prisma migrate dev

# Deploy migration
npx prisma migrate deploy
```

---

## 📊 Database Schema Quick Ref

### User
```prisma
id           String   (cuid)
email        String   (unique)
passwordHash String
role         Role     (CREATOR/ADMIN)
store        CreatorStore?
```

### CreatorStore
```prisma
id          String   (cuid)
userId      String   (unique)
handle      String   (unique)
displayName String?
location    String?
bio         String?
avatarUrl   String?
bannerUrl   String?
theme       Theme    (LIGHT/DARK)
categories  String[] (max 5)
social      Json     (array)
isPublished Boolean
```

---

## 🎯 Testing Checklist

### Sign Up Flow
- [ ] Email validation
- [ ] Password requirements
- [ ] Handle validation (3-30 chars)
- [ ] Reserved handle rejection
- [ ] Duplicate email/handle prevention
- [ ] Successful redirect to dashboard

### Store Customization
- [ ] Profile image upload
- [ ] Content fields save
- [ ] Social links save
- [ ] Categories (max 5)
- [ ] Banner upload
- [ ] Theme toggle
- [ ] Gradient preview

### Navigation
- [ ] Dashboard tabs switch
- [ ] Edit/Preview toggle
- [ ] Copy URL button
- [ ] Sign out

---

## 💡 Pro Tips

### Development
- Use Prisma Studio for database inspection
- Check Network tab for API call debugging
- Use React DevTools for component state
- Console.log in API routes for debugging

### Performance
- Images are optimized by Next.js automatically
- Debounce is 400ms (adjustable in ContentForm)
- Server components reduce client bundle

### Security
- Never commit .env files
- Use strong SESSION_SECRET
- Validate all inputs server-side
- Hash passwords before storing

---

## 📞 Support Resources

- [Main README](./README.md) - Full documentation
- [Setup Guide](./setup.md) - Detailed setup steps
- [Project Overview](./PROJECT_OVERVIEW.md) - Architecture details

---

## 🎉 Quick Win Checklist

New to the project? Try these:

1. ✅ Run `npm run dev` and visit localhost:3000
2. ✅ Sign up with a test account
3. ✅ Click Edit button on store card
4. ✅ Upload a profile image
5. ✅ Toggle between Light/Dark theme
6. ✅ Add some categories
7. ✅ Click Preview to see your store
8. ✅ Copy your store URL

---

**Last Updated**: 2025-10-11
**Version**: 1.0.0 MVP

