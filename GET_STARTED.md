# 🚀 Get Started with CollabVerse

Welcome! Your CollabVerse MVP is ready to run. Here's everything you need to get started in **5 minutes**.

---

## ⚡ Super Quick Start

```bash
# 1️⃣ Install dependencies (takes ~1 min)
npm install

# 2️⃣ Create your .env file
cat > .env << 'EOF'
DATABASE_URL="postgresql://user:password@localhost:5432/collabverse"
SESSION_SECRET="your-32-character-random-string-here"
EOF

# 3️⃣ Set up the database (takes ~10 sec)
npx prisma db push

# 4️⃣ Start the app (takes ~5 sec)
npm run dev

# 5️⃣ Open in browser
# Navigate to http://localhost:3000
```

🎉 **That's it!** You should see the sign-in page.

---

## 🔧 Before You Start

You need:
- ✅ **Node.js 18+** installed
- ✅ **PostgreSQL** database (local or hosted)

### Get a Free Database (No Credit Card)

Choose one:
- **[Neon](https://neon.tech)** - Free PostgreSQL, instant setup
- **[Supabase](https://supabase.com)** - Free tier, 500MB
- **[ElephantSQL](https://www.elephantsql.com/)** - Free tier, 20MB

Copy the connection string and use it as your `DATABASE_URL`.

---

## 📝 Your First Steps

### 1. Sign Up
- Go to `/auth/sign-up`
- Enter email and password
- Choose a handle (e.g., `johndoe` → becomes `collabverse.io/johndoe`)
- Click "Create Account"

### 2. Explore Dashboard
You'll land on **My Store** page with 3 tabs:
- **My Store** - Customize your profile ⭐
- **Collabs** - Coming soon placeholder
- **Analytics** - Coming soon placeholder

### 3. Edit Your Store
Click the **Edit** button (top-left of store card):

#### Content Tab
- Upload profile image
- Add display name
- Set location  
- Write bio
- Add social links (TikTok, Instagram, etc.)
- Select categories (up to 5)

#### Design Tab
- Upload banner image
- Toggle Light/Dark theme
- See gradient fade preview

### 4. Preview Your Store
Click **Preview** to see how your store looks to visitors!

---

## 🎯 What You Can Do

### ✅ Implemented Features

| Feature | Status | Description |
|---------|--------|-------------|
| Sign Up/Sign In | ✅ | Full auth with sessions |
| Handle Creation | ✅ | Unique handle with locked prefix |
| Profile Customization | ✅ | Image, name, bio, location |
| Social Links | ✅ | TikTok, Instagram, YouTube, Snapchat |
| Categories | ✅ | Select up to 5 content categories |
| Banner Upload | ✅ | Background image with fade effect |
| Light/Dark Theme | ✅ | Toggle between themes |
| Auto-save | ✅ | Changes save automatically |
| Preview Mode | ✅ | See your store as visitors do |

### 🚧 Coming Soon (Out of Scope for MVP)
- Public store pages at `/:handle`
- Collaboration requests
- Analytics tracking
- Email notifications
- Payment processing

---

## 📚 Documentation

We've created extensive docs for you:

| File | Purpose |
|------|---------|
| [README.md](./README.md) | Full documentation & tech details |
| [setup.md](./setup.md) | Step-by-step setup guide |
| [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) | Architecture & design decisions |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | Command cheat sheet |

---

## 🐛 Troubleshooting

### "Can't connect to database"
```bash
# Make sure PostgreSQL is running
# Check your DATABASE_URL in .env
# Try: npx prisma db push --force-reset
```

### "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules .next
npm install
```

### "Session error"
```bash
# Make sure SESSION_SECRET is 32+ characters
# Try clearing browser cookies
```

### Still stuck?
Check [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) section "Common Issues & Fixes"

---

## 🎨 Project Structure at a Glance

```
collabverse/
├── src/
│   ├── app/              # Pages & API routes
│   │   ├── api/          # Backend endpoints
│   │   ├── auth/         # Sign in/up pages
│   │   └── dashboard/    # Dashboard pages
│   ├── components/       # React components
│   └── lib/              # Utils & configs
├── prisma/
│   └── schema.prisma     # Database schema
├── .env                  # Your config (create this!)
└── package.json          # Dependencies
```

---

## 🎓 Learning Path

### New to Next.js?
1. Check out the [Next.js Tutorial](https://nextjs.org/learn)
2. Explore `src/app` directory structure
3. Read about [App Router](https://nextjs.org/docs/app)

### Want to Customize?
1. Colors: Edit `src/app/globals.css`
2. Components: Check `src/components/`
3. Database: Modify `prisma/schema.prisma`

### Ready to Deploy?
1. See [README.md](./README.md) "Production Deployment" section
2. Recommended: Deploy to [Vercel](https://vercel.com) (free)

---

## 🚀 Next Steps

Once you're up and running:

1. **Customize Your Store**
   - Upload your profile pic
   - Write an engaging bio
   - Add your social links
   - Choose your theme

2. **Explore the Code**
   - Check out the components
   - Read the API routes
   - Understand the database schema

3. **Plan Enhancements**
   - Add public store pages
   - Implement file storage (AWS S3, Cloudinary)
   - Build collaboration features
   - Add analytics

4. **Deploy to Production**
   - Get a hosted database
   - Deploy to Vercel
   - Share your store!

---

## 💬 Quick Commands Cheat Sheet

```bash
# Development
npm run dev              # Start dev server
npx prisma studio        # Open database GUI

# Database  
npx prisma db push       # Sync schema
npx prisma generate      # Regenerate client

# Production
npm run build            # Build app
npm start                # Start production server
```

---

## 🎉 You're All Set!

Your CollabVerse MVP includes:
- ✅ 50+ files of production-ready code
- ✅ Complete authentication system
- ✅ Full store customization
- ✅ Modern UI with Light/Dark themes
- ✅ Optimistic updates & auto-save
- ✅ Type-safe with TypeScript
- ✅ Database with Prisma ORM
- ✅ Comprehensive documentation

**Ready to build something amazing?**

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) and sign up! 🚀

---

**Questions?** Check the docs or explore the codebase. Everything is commented and organized.

**Happy coding!** 🎨

