# AI Agent Guidelines - Tuto-U

## 1. Project Overview
- **Description**: Tuto-U is a peer tutoring platform designed specifically for students and tutors of Yachay Tech University (Ecuador).
- **Core Business Logic**: Allows students to browse courses, check tutor availabilities, request individual tutoring sessions (validated to be at least 8 hours in advance), rate completed sessions, and report issues. Tutors configure duration-based pricing, select courses they teach, and accept/reject requests.
- **Target Audience**: Students and tutors of Yachay Tech (`@yachaytech.edu.ec` emails only).

## 2. Tech Stack & Architecture
- **Framework**: Next.js `^16.2.6` (App Router, Server Components by default) & React `^19.2.6` (React 19).
- **Database & ORM**: PostgreSQL with Prisma `^7.8.0` and custom database adapter `@prisma/adapter-pg`.
- **Auth**: Next-Auth (Auth.js) `5.0.0-beta.31` using JWT sessions and a custom Prisma adapter.
- **Styling & UI**: Tailwind CSS `^3.4.19` & Radix/shadcn UI components.
- **Forms & Validation**: React Hook Form `^7.76.0` & Zod `^3.25.76`.
- **Email**: Resend `^3.5.0` & `@react-email/components`.
- **Key Architectures**: 
  - Centralized database instance: `import { db } from "@/lib/db"`.
  - Server Actions in `src/actions/` handle mutations; UI pages inside `src/app/` are Server-first.

## 3. Setup & Commands
Use `pnpm` as the package manager:
```bash
# Install dependencies & automatically generate Prisma client
pnpm install

# Run the development server
pnpm dev

# Generate Prisma Client manually (writes to src/generated/prisma)
pnpm prisma generate

# Apply local database migrations
pnpm prisma migrate dev

# Build for production
pnpm build

# Lint the codebase
pnpm lint
```

## 4. Code Style & Conventions
- **Language**: All user-facing UI copy and form validation/error messages must be in **Spanish**.
- **Server Actions**:
  - Always start with `"use server";` at the top.
  - Validate parameters with Zod schemas from `src/schemas/index.ts`.
  - Always return `{ error: string }` or `{ message: string }` / `{ success: boolean }` rather than throwing uncaught errors to the frontend.
  - Do not call `redirect()` inside try-catch blocks unless you explicitly re-throw the error (it relies on throwing a special Next.js redirect error).
- **Client Components**: Mark with `"use client";` when hooks (`useState`, `useEffect`, etc.) are needed.
- **Path Aliases**: Always use `@/` for imports from `src/` (e.g. `@/components/...`, `@/lib/...`).
- **Google Font Quirks**: In `src/app/layout.tsx`, the `Chakra_Petch` font is loaded but assigned to the variable name `inter`. Refer to it as `inter.className` for body class applications.

## 5. Git Workflow & Commit Guidelines
- **Branch Names**: `feature/short-desc`, `bugfix/short-desc`, `chore/short-desc`.
- **Commit Messages**: Conventional Commits format:
  - `feat: add rating dialog to tutoring cards`
  - `fix: resolve uncontrolled input warning on form`
  - `chore: update tailwind styles`
- **PR Readiness**: Verify changes build locally with `pnpm build` and lint with `pnpm lint` before pushing.

## 6. Boundaries & Guardrails
- **DO NOT Edit**:
  - `src/generated/prisma/...`: Automatically generated on build; changes will be overwritten.
  - `pnpm-lock.yaml`: Let `pnpm` CLI manage dependencies.
- **Environment Safety**: Never commit real secret keys. Make sure `.env` is listed in `.gitignore`.
- **Database Pool Safety**: Do not instantiate `new PrismaClient()` in actions/routes. Always import the singleton `db` instance from `@/lib/db`.
- **Auth Routes**: Any new routes must be defined in `src/routes.ts` under either `publicRoutes` or `authRoutes` to ensure the middleware proxy blocks or allows traffic correctly.

## 7. UI & Layout Guidelines
- **Responsive Page Sizing**:
  - Always wrap content pages with the `PageContainer` component (`import { PageContainer } from "@/components/page-container"`).
  - Use `size="default"` (max-w-7xl) for standard text/accordion content pages (e.g. FAQ).
  - Use `size="xl"` (max-w-screen-xl) for profile and settings pages.
  - Use `size="2xl"` (max-w-screen-2xl) for listings grids, carousels, and main dashboards.
  - Use `size="full"` for landing pages containing full-bleed background sections.
- **Fixed Navbar Clearance**:
  - Do not use manual or page-specific padding offsets (`pt-32`, `pt-40`, etc.) to clear navbars. Let `PageContainer` clear the navbar automatically (`clearNavbar={true}`).
- **Footer Placement & Alignment**:
  - Do not duplicate footer HTML code. Import the reusable `Footer` component (`import { Footer } from "@/components/footer"`).
  - Match the parent layout size (`size`) to maintain correct horizontal grid gutter alignment.
- **Component Styling & Composition**:
  - Use Shadcn's `<Card>` components instead of raw `div`s with custom borders/padding for container elements.
  - Ensure links nested in interactive actions use `<Button asChild><Link href="...">...</Link></Button>` to comply with standard accessibility and hydration patterns.

