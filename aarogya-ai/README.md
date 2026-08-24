# AarogyaAI 🏥

> India's most comprehensive AI-powered health platform — built with Next.js, Tailwind CSS, and Supabase.

---

## 🚀 Getting Started

```bash
cd aarogya-ai
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🧪 Demo Credentials

All accounts use the same password: **`Test@1234`**

| Role | Email | Password | Name |
|------|-------|----------|------|
| 👤 General Patient | `patient@aarogya.ai` | `Test@1234` | Riya Sharma |
| 🌾 Rural User | `rural@aarogya.ai` | `Test@1234` | Ramkishan Yadav |
| 👵 Elderly Patient | `elderly@aarogya.ai` | `Test@1234` | Savitri Devi |
| 👩 Women & Child | `women@aarogya.ai` | `Test@1234` | Anjali Singh |
| 💊 Chronic Disease | `chronic@aarogya.ai` | `Test@1234` | Suresh Agarwal |
| 🧠 Mental Health | `mental@aarogya.ai` | `Test@1234` | Karan Mehra |
| 🩺 Doctor | `doctor@aarogya.ai` | `Test@1234` | Dr. Priya Nair |
| 🏨 Hospital Admin | `hospital@aarogya.ai` | `Test@1234` | Fortis Admin |

> **Shortcut:** On each sign-in page, click **"Auto-fill →"** to pre-fill credentials automatically.

---

## 🗺️ Pages

| URL | Description |
|-----|-------------|
| `/` | Landing page |
| `/auth/patient` | General Patient sign in/up |
| `/auth/rural` | Rural User sign in/up |
| `/auth/elderly` | Elderly Patient sign in/up |
| `/auth/women` | Women & Child sign in/up |
| `/auth/chronic` | Chronic Disease sign in/up |
| `/auth/mental` | Mental Health sign in/up |
| `/auth/doctor` | Doctor sign in/up |
| `/auth/hospital` | Hospital Admin sign in/up |
| `/dashboard/[role]` | Role-specific dashboard |

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Auth + DB | Supabase (when configured) |
| Language | TypeScript |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |

---

## 🔐 Connecting Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Update `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Run `supabase/schema.sql` in the Supabase SQL Editor
5. Uncomment Supabase blocks in:
   - `src/middleware.ts`
   - `src/components/auth/SignInForm.tsx`
   - `src/components/auth/SignUpForm.tsx`
   - `src/app/dashboard/[role]/page.tsx`

---

## 📁 Project Structure

```
src/
│
├── app/                          ← PAGES (Next.js routing)
│   ├── page.tsx                  ← Home / Landing page
│   ├── layout.tsx                ← Root HTML + font setup
│   ├── globals.css               ← Global Tailwind styles
│   ├── auth/[role]/page.tsx      ← Sign in/up (1 route handles all 8 roles)
│   ├── dashboard/[role]/page.tsx ← Dashboard (1 route handles all 8 roles)
│   └── api/auth/signout/         ← Sign out API route
│
├── components/                   ← UI PIECES (reusable building blocks)
│   ├── landing/                  ← Sections on the home page
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── RolesSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── EmergencyBanner.tsx
│   │   ├── Testimonials.tsx
│   │   └── Footer.tsx
│   ├── auth/                     ← Login / signup UI
│   │   ├── AuthLayout.tsx        ← Left panel + right panel wrapper
│   │   ├── AuthTabs.tsx          ← Sign In / Sign Up tab switcher
│   │   ├── SignInForm.tsx        ← Sign in form (all roles)
│   │   └── SignUpForm.tsx        ← Sign up form (role-specific fields)
│   └── dashboard/
│       └── DashboardClient.tsx   ← Dashboard UI (stats, actions, profile)
│
├── lib/                          ← LOGIC & DATA
│   ├── roles.ts                  ← Config for all 8 roles (colors, features)
│   ├── dummy-users.ts            ← Test accounts & demo data
│   ├── auth-schemas.ts           ← Form validation rules (Zod)
│   ├── utils.ts                  ← cn() helper for Tailwind classes
│   └── supabase/
│       ├── client.ts             ← Supabase browser client
│       └── server.ts             ← Supabase server client
│
├── types/
│   └── index.ts                  ← Shared TypeScript types
│
└── middleware.ts                 ← Auth guard (protects /dashboard routes)
```

---

## 🇮🇳 Made in India with ❤️
