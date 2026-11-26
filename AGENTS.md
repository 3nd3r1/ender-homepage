# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Commands

### Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production (static export)
- `npm run start` - Build and start production server

### Code Quality

- `npm run lint` - Run TypeScript type checking, ESLint, and Prettier format checking
- `npm run lint:fix` - Run TypeScript type checking and ESLint with automatic fixes
- `npm run format` - Format code with Prettier

### Code Quality Requirements

**IMPORTANT**: Before completing any task, ALWAYS run these commands in order:

1. `npm run lint` - Check for TypeScript and linting issues
2. `npm run format` - Format the code

Do NOT run `npm run build` or `npm run dev` - the user will run these commands themselves.

All type errors and linting errors must be resolved before considering a task complete.

### Notes

- This project uses static export mode (`output: "export"` in next.config.mjs)
- ESLint is configured with TypeScript support and Next.js best practices
- Prettier is configured for consistent code formatting
- All code must pass linting, formatting, and type checking before completion

## Architecture

This is Viljami Ranta's personal homepage built with Next.js 14, featuring a portfolio section with works and a blog section, both fetched from Hygraph (GraphCMS).

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: TailwindCSS + SCSS
- **Content**: GraphQL + Hygraph CMS
- **Animations**: Framer Motion
- **Theme**: next-themes for dark/light mode
- **TypeScript**: Full TypeScript support with Zod validation
- **Content Management**: Hygraph (formerly GraphCMS) for both blog posts and portfolio works

### Project Structure

- `src/app/` - Next.js App Router pages, layouts, and metadata routes
    - `layout.tsx` - Root layout with providers and navigation
    - `providers.tsx` - Theme provider (`next-themes`)
    - `page.tsx` - Homepage with bio, socials, feedback form, and personal info
    - `blog/` - Blog section pages, dynamic routes, and per-post OG/Twitter image routes
    - `works/` - Portfolio section pages (featured & archive) and dynamic routes
    - `opengraph-image.tsx` & `twitter-image.tsx` - Site-wide social image generation
    - `sitemap.ts` - Sitemap generation
- `src/components/` - Reusable UI components
    - `navbar.tsx` - Navigation with blog and works links
    - `theme-switch.tsx` - Theme toggle button
    - `transition.tsx` - Page transitions with Framer Motion
    - `feedback-form.tsx` - Anonymous feedback form powered by Web3Forms
    - `logo.tsx` - Site logo component
    - `icons/` - Custom icon components
- `src/lib/` - Data fetching and utilities
    - `blog.ts` - GraphQL queries and caching for blog posts
    - `work.ts` - GraphQL queries and caching for portfolio works
    - `og.tsx` - OpenGraph/Twitter image generation helper
    - `achievements/` - Achievement definitions, events, manager, and storage
- `src/contexts/` & `src/hooks/` - Achievement React context (`achievement-context.tsx`) and hook (`useAchievements.ts`)
- `src/validators/` - Zod schema validation (`blog.ts`, `work.ts`, `achievements.ts`)
- `src/assets/fonts/` - Bundled Ubuntu Mono fonts used for OG image rendering
- `build/` - Production `Dockerfile` and `nginx.conf` for serving the static export

### Key Features

- **Static Export**: Configured for static deployment via Docker + Nginx
- **Theme System**: Dark/light mode with system preference detection
- **Blog System**: Full blog with posts fetched from Hygraph CMS and feedback forms
- **Portfolio Integration**: Works/projects fetched from Hygraph CMS via GraphQL
- **Feedback Form**: Client-side submission to Web3Forms on homepage and blog posts
- **Dynamic Social Images**: Generated OpenGraph and Twitter images using `next/og`
- **Type Safety**: Comprehensive TypeScript with Zod runtime validation
- **Responsive Design**: Mobile-first with TailwindCSS
- **SEO Optimized**: Comprehensive metadata and OpenGraph tags

### Data Flow & Environment Variables

- Both blog posts and portfolio works are fetched from Hygraph CMS using GraphQL
- `GRAPHCMS_ENDPOINT` - Required for Hygraph CMS GraphQL queries
- `NEXT_PUBLIC_WEB3FORMS_KEY` - Optional Web3Forms access key for the feedback form (form is hidden when unset)
- Uses React `cache` for GraphQL queries to optimize performance
- Type-safe GraphQL with `@graphql-typed-document-node/core`
- Runtime validation with Zod schemas ensures data integrity

### Dependencies

- **Core**: React 18, Next.js 14, TypeScript 5
- **Styling**: TailwindCSS 3.4, Sass, @tailwindcss/typography
- **GraphQL**: graphql-request, @graphql-typed-document-node/core
- **Validation**: Zod 4.3
- **UI/UX**: Framer Motion, next-themes, react-icons
- **Development**: ESLint 9, Prettier, TypeScript ESLint

### Configuration Files

- `next.config.mjs` - Static export, image optimization disabled, Hygraph remote patterns
- `tailwind.config.ts` - TailwindCSS configuration
- `postcss.config.mjs` - PostCSS for TailwindCSS
- `eslint.config.mjs` - ESLint configuration with TypeScript and Next.js support
- `shell.nix` - Nix development shell configuration
