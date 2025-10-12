# Component Hierarchy & Data Flow

Visual guide to understand how components are structured and how data flows through the application.

---

## 🌳 Application Tree

```
app/
├── RootLayout (globals.css, Toaster)
│   │
│   ├── HomePage (/) → redirect to /auth/sign-in
│   │
│   ├── Auth Routes
│   │   ├── SignInPage (/auth/sign-in)
│   │   │   ├── Input (email)
│   │   │   ├── Input (password)
│   │   │   └── Button (submit)
│   │   │
│   │   └── SignUpPage (/auth/sign-up)
│   │       ├── Input (email)
│   │       ├── Input (password)
│   │       ├── HandleInput (custom)
│   │       │   ├── [locked] collabverse.io/
│   │       │   └── Input (handle)
│   │       └── Button (submit)
│   │
│   └── Dashboard Routes
│       └── DashboardLayout
│           ├── DashboardNav (sidebar)
│           │   ├── Avatar
│           │   ├── Link (My Store)
│           │   ├── Link (Collabs)
│           │   ├── Link (Analytics)
│           │   └── Button (Sign Out)
│           │
│           └── main content
│               │
│               ├── MyStorePage (/dashboard/my-store) ⭐
│               │   ├── Header
│               │   │   └── Button (Copy URL)
│               │   │
│               │   ├── [Preview Card Container]
│               │   │   ├── StoreCardToggle
│               │   │   │   └── Button (Edit/Preview)
│               │   │   │
│               │   │   └── StorePreviewCard
│               │   │       ├── Banner
│               │   │       │   ├── Image (background)
│               │   │       │   └── Gradient Overlay
│               │   │       │
│               │   │       ├── Avatar (profile pic)
│               │   │       ├── Display Name
│               │   │       ├── Location
│               │   │       ├── Bio
│               │   │       ├── Categories (chips)
│               │   │       └── Social Links (icons)
│               │   │
│               │   └── EditPanel (conditional, only in edit mode)
│               │       └── Tabs
│               │           ├── Content Tab
│               │           │   └── ContentForm
│               │           │       ├── Avatar Upload
│               │           │       ├── Input (displayName)
│               │           │       ├── Input (location)
│               │           │       ├── Textarea (bio)
│               │           │       ├── Social Inputs (x4)
│               │           │       └── Categories (chips)
│               │           │
│               │           └── Design Tab
│               │               └── DesignForm
│               │                   ├── Banner Upload
│               │                   ├── Theme Toggle
│               │                   └── Gradient Preview
│               │
│               ├── CollabsPage (/dashboard/collabs)
│               │   └── Placeholder Content
│               │
│               └── AnalyticsPage (/dashboard/analytics)
│                   ├── Stat Cards (x3)
│                   └── Placeholder Content
```

---

## 🔄 Data Flow Diagram

### Authentication Flow

```
┌─────────────┐
│  User Input │
│ (Sign Up)   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│   Client Validation     │
│   (Zod Schema)          │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  POST /api/auth/sign-up │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  Server Validation      │
│  • Check reserved       │
│  • Check duplicates     │
│  • Hash password        │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  Create User & Store    │
│  (Prisma Transaction)   │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  Create Session         │
│  (iron-session)         │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  Redirect to Dashboard  │
└─────────────────────────┘
```

### Store Update Flow (Optimistic)

```
User Types in Form
       │
       ▼
┌─────────────────┐
│  Update Local   │ ← Immediate UI update
│  State          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Debounce       │ ← Wait 400ms
│  (useDebounce)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  PATCH          │
│  /api/store     │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
Success    Error
    │         │
    ▼         ▼
 Show✓    Show❌
  Save     Toast
```

### Image Upload Flow

```
User Selects File
       │
       ▼
┌──────────────────┐
│ Client Validation│
│ • Type check     │
│ • Size check     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Create FormData  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ POST /api/upload │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Server Validation│
│ • Type check     │
│ • Size check     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Return Mock URL  │
│ (In prod: S3)    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Update Store     │
│ with URL         │
└──────────────────┘
```

---

## 🎯 Component Responsibilities

### Layout Components

#### `RootLayout`
- Applies global styles
- Wraps entire app
- Includes Toaster for notifications

#### `DashboardLayout`
- Checks authentication
- Renders sidebar navigation
- Wraps dashboard pages

### Page Components

#### `SignUpPage` / `SignInPage`
- Form state management
- Client-side validation
- API calls to auth endpoints
- Redirect on success

#### `MyStorePage` ⭐ (Main Feature)
- Fetches store data
- Manages edit/preview mode
- Handles store updates
- Coordinates child components

#### `CollabsPage` / `AnalyticsPage`
- Placeholder content
- Future feature shells

### Feature Components

#### `StorePreviewCard`
**Props**: `store: CreatorStore`
**Responsibility**: Render store preview
- Display avatar, banner, bio
- Show categories and social links
- Adapt to theme (Light/Dark)

#### `StoreCardToggle`
**Props**: `mode, onToggle`
**Responsibility**: Toggle edit/preview
- Show current mode
- Trigger mode change

#### `EditPanel`
**Props**: `store, onUpdate`
**Responsibility**: Edit interface container
- Manage tabs (Content/Design)
- Pass store data to forms

#### `ContentForm`
**Props**: `store, onUpdate`
**Responsibility**: Content editing
- All profile fields
- Image upload
- Debounced auto-save
- Character counters

#### `DesignForm`
**Props**: `store, onUpdate`
**Responsibility**: Design editing
- Banner upload
- Theme toggle
- Gradient preview

### Utility Components

#### `HandleInput`
**Props**: `value, onChange, error`
**Responsibility**: Special handle input
- Show locked prefix
- Validate format
- Display errors

#### `Banner`
**Props**: `src, theme`
**Responsibility**: Banner with fade
- Display background image
- Apply gradient overlay
- Adapt to theme

#### `DashboardNav`
**Props**: None (uses pathname)
**Responsibility**: Navigation sidebar
- Active route highlighting
- Sign out functionality

---

## 📦 Component Props Flow

### MyStorePage → EditPanel → ContentForm

```typescript
// MyStorePage
const [store, setStore] = useState<CreatorStore>()

const handleUpdate = async (updates: Partial<CreatorStore>) => {
  const response = await fetch('/api/store', {
    method: 'PATCH',
    body: JSON.stringify(updates)
  })
  const updatedStore = await response.json()
  setStore(updatedStore)
}

// Pass to EditPanel
<EditPanel store={store} onUpdate={handleUpdate} />

// EditPanel passes to ContentForm
<ContentForm store={store} onUpdate={onUpdate} />

// ContentForm uses debounced save
const debouncedSave = useDebounce((data) => {
  onUpdate(data)  // Calls handleUpdate in MyStorePage
}, 400)
```

---

## 🎨 Styling Pattern

### Component Styling Strategy

```typescript
// 1. Base styles from Tailwind
<div className="rounded-lg border p-4">

// 2. Theme-aware styles
<div className={store.theme === 'LIGHT' ? 'bg-white' : 'bg-black'}>

// 3. Dynamic styles with cn()
<div className={cn(
  'base-styles',
  isActive && 'active-styles',
  className
)}>

// 4. Custom gradients
<div className="bg-gradient-to-b from-white/90 to-transparent">
```

---

## 🔌 API Integration Pattern

### Standard API Call Pattern

```typescript
// 1. Client-side call
const response = await fetch('/api/endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})

// 2. Check response
if (!response.ok) {
  const error = await response.json()
  throw new Error(error.message)
}

// 3. Parse result
const result = await response.json()

// 4. Update state
setState(result)
```

### API Route Pattern

```typescript
// 1. Get session
const session = await requireAuth()

// 2. Parse body
const body = await request.json()

// 3. Validate with Zod
const result = Schema.safeParse(body)
if (!result.success) {
  return NextResponse.json({ error }, { status: 400 })
}

// 4. Database operation
const data = await prisma.model.operation()

// 5. Return result
return NextResponse.json(data)
```

---

## 🔐 Authentication Guard Pattern

```typescript
// Server Component (Layout)
export default async function DashboardLayout() {
  const session = await getSession()
  
  if (!session.isLoggedIn) {
    redirect('/auth/sign-in')
  }
  
  return <>{children}</>
}

// API Route
export async function GET() {
  const session = await requireAuth() // Throws if not authenticated
  
  // ... protected logic
}
```

---

## 🎣 Custom Hooks

### useDebounce

```typescript
// Usage in ContentForm
const debouncedSave = useDebounce((data) => {
  onUpdate(data)
}, 400)

// Call on every change
const handleChange = (field, value) => {
  setFormData({ ...formData, [field]: value })
  debouncedSave({ [field]: value })
}
```

---

## 🗄️ State Management

### Component-level State

```typescript
// MyStorePage
const [store, setStore] = useState<CreatorStore | null>(null)
const [loading, setLoading] = useState(true)
const [mode, setMode] = useState<'preview' | 'edit'>('preview')
```

### Form State

```typescript
// ContentForm
const [formData, setFormData] = useState({
  displayName: store.displayName || '',
  location: store.location || '',
  bio: store.bio || ''
})
const [categories, setCategories] = useState<string[]>(store.categories)
```

---

## 📊 Data Models

### Frontend Types

```typescript
interface CreatorStore {
  id: string
  userId: string
  handle: string
  displayName: string | null
  location: string | null
  bio: string | null
  avatarUrl: string | null
  bannerUrl: string | null
  theme: 'LIGHT' | 'DARK'
  categories: string[]
  social: SocialLink[] | null
  isPublished: boolean
}

interface SocialLink {
  network: string
  url: string
}
```

---

## 🎬 Component Lifecycle

### MyStorePage Lifecycle

```
1. Mount
   ↓
2. useEffect → fetchStore()
   ↓
3. setStore(data) → triggers re-render
   ↓
4. User clicks Edit → setMode('edit')
   ↓
5. EditPanel appears
   ↓
6. User edits → debounced handleUpdate()
   ↓
7. API call → setStore(updated)
   ↓
8. Re-render with new data
```

---

**This diagram should help you navigate the codebase and understand how everything fits together!**

