# AarogyaAI — Project Brain
> Master reference file. Read this before any work session to avoid re-reading the PDF.
> ⚠️ Tech stack upgraded to Next.js + Tailwind CSS + Supabase (full SaaS)

---

## 🧠 What is AarogyaAI?
A comprehensive AI-powered health platform for India. Full-stack SaaS product covering patients, doctors, hospitals, rural users, elderly, women, chronic disease patients, and mental health users.

---

## ⚙️ Tech Stack (CURRENT)

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 14** (App Router) |
| Styling | **Tailwind CSS v3** + `tailwind-merge` + `clsx` |
| Auth + DB | **Supabase** (Auth, PostgreSQL, Storage, Realtime) |
| Language | **TypeScript** |
| UI Components | **shadcn/ui** (built on Radix UI) |
| Icons | **Lucide React** |
| Forms | **React Hook Form** + **Zod** validation |
| State | React Context + Zustand (where needed) |
| Fonts | **next/font** → Inter |
| Deployment | **Vercel** |

---

## 🏗️ Build Order

1. ✅ Project scaffold (Next.js + Tailwind + Supabase setup)
2. 🔄 Landing Page (`/`) — **current**
3. 🔄 8 Role-based Auth pages (`/auth/[role]`) — **current**
4. Role dashboards (`/dashboard/[role]`)
5. Feature modules per role
6. AI integrations (OpenAI / Gemini)
7. Payments (Razorpay)

---

## 🎨 Branding

- **Name:** AarogyaAI
- **Tagline:** "Your AI Health Companion"
- **Colors (Tailwind custom):**
  - Primary: `#1A6B3C` → `primary`
  - Secondary: `#F4A832` → `secondary`
  - Accent: `#2EC4B6` → `accent`
  - Background: `#F8FBF9` → `background`
  - Dark: `#1A1A2E` → `foreground`
- **Font:** Inter (via next/font)

---

## 👥 8 User Roles

| # | Role | Emoji | Color | Tailwind bg | Route |
|---|------|-------|-------|-------------|-------|
| 1 | General Patient | 👤 | `#2EC4B6` | `bg-teal-500` | `/auth/patient` |
| 2 | Rural / Remote User | 🌾 | `#8BC34A` | `bg-lime-500` | `/auth/rural` |
| 3 | Elderly Patient | 👵 | `#FF8A65` | `bg-orange-400` | `/auth/elderly` |
| 4 | Women & Child Health | 👩 | `#EC407A` | `bg-pink-500` | `/auth/women` |
| 5 | Chronic Disease Patient | 💊 | `#7E57C2` | `bg-violet-500` | `/auth/chronic` |
| 6 | Mental Health User | 🧠 | `#42A5F5` | `bg-blue-400` | `/auth/mental` |
| 7 | Doctor / Clinician | 🩺 | `#26A69A` | `bg-teal-600` | `/auth/doctor` |
| 8 | Hospital / Administrator | 🏨 | `#5C6BC0` | `bg-indigo-500` | `/auth/hospital` |

---

## 🔑 Role-Specific Sign Up Fields

| Role | Extra Fields |
|------|-------------|
| General Patient | Date of birth, gender |
| Rural User | State, preferred language, nearest district |
| Elderly Patient | Age, caregiver name & phone |
| Women & Child | Pregnancy status (optional) |
| Chronic Disease | Disease type (diabetes/BP/heart/other) |
| Mental Health | Anonymous mode toggle |
| Doctor | Medical license number, specialization, hospital name |
| Hospital/Admin | Hospital name, registration number, city, bed capacity |

---

## 🗂️ Project Structure (Next.js App Router)

```
aarogya-ai/
├── app/
│   ├── layout.tsx                  ← Root layout (font, providers)
│   ├── page.tsx                    ← Landing page
│   ├── auth/
│   │   └── [role]/
│   │       └── page.tsx            ← Dynamic auth page per role
│   └── dashboard/
│       └── [role]/
│           └── page.tsx            ← Role dashboard (future)
├── components/
│   ├── landing/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── RolesSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── EmergencyBanner.tsx
│   │   ├── Testimonials.tsx
│   │   └── Footer.tsx
│   ├── auth/
│   │   ├── AuthLayout.tsx          ← Left panel + right panel wrapper
│   │   ├── SignInForm.tsx
│   │   ├── SignUpForm.tsx
│   │   └── RoleConfig.ts           ← Role colors, icons, fields config
│   └── ui/                         ← shadcn/ui components
├── lib/
│   ├── supabase/
│   │   ├── client.ts               ← Browser Supabase client
│   │   ├── server.ts               ← Server Supabase client
│   │   └── middleware.ts           ← Auth middleware
│   ├── validations/
│   │   └── auth.ts                 ← Zod schemas per role
│   └── utils.ts                    ← cn() helper
├── types/
│   └── index.ts                    ← Shared TypeScript types
├── middleware.ts                   ← Next.js middleware (auth guard)
├── tailwind.config.ts
├── next.config.ts
└── .env.local                      ← Supabase keys (never commit)
```

---

## 🗄️ Supabase Schema (key tables)

```sql
-- profiles (extends auth.users)
profiles (id uuid PK → auth.users, role text, full_name text, phone text, created_at)

-- role-specific profile tables
patient_profiles    (id, user_id FK, dob, gender, health_score int)
rural_profiles      (id, user_id FK, state, language, district)
elderly_profiles    (id, user_id FK, age, caregiver_name, caregiver_phone)
women_profiles      (id, user_id FK, pregnancy_status, cycle_length)
chronic_profiles    (id, user_id FK, disease_type, diagnosis_date)
mental_profiles     (id, user_id FK, is_anonymous bool)
doctor_profiles     (id, user_id FK, license_no, specialization, hospital)
hospital_profiles   (id, user_id FK, hospital_name, reg_no, city, bed_capacity)
```

---

## 🔖 Key Features Summary

### AI Tools (cross-role)
- AarogyaBot — 24/7 AI health chatbot
- Symptom checker & diagnosis AI
- Medicine interaction checker
- Lab report analyzer
- X-Ray / MRI AI scan reader
- AI health risk prediction
- Diet & nutrition AI planner

### Emergency Features
- One-tap SOS + auto location share
- Direct 108 ambulance call
- Offline CPR & first aid guide
- Emergency medical ID card

### Rural / Accessibility
- 22 Indian languages
- Offline-first features
- Voice-based AI assistant
- Nearest hospital/clinic/pharmacy finder

### Chronic & Specialist Care
- Glucose/BP log with graphs
- Wearable device sync
- Video consultation
- Digital prescriptions

---

## 📝 Dev Notes
- Use `createServerClient` from `@supabase/ssr` for server components
- Use `createBrowserClient` for client components
- Auth redirect: after login → `/dashboard/[role]`
- RLS (Row Level Security) enabled on all tables
- Role stored in `profiles.role` and also in `user_metadata` on signup
- `.env.local` needs: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Old HTML/CSS/JS files in root are superseded — ignore them
