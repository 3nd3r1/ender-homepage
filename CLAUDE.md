# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
3. `npm run build` - Ensure the build succeeds

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

- `src/app/` - Next.js App Router pages and layouts
    - `layout.tsx` - Root layout with theme provider and navigation
    - `page.tsx` - Homepage with bio, socials, and personal info
    - `blog/` - Blog section pages and dynamic routes
    - `works/` - Portfolio section pages and dynamic routes
    - `sitemap.ts` - Sitemap generation
- `src/components/` - Reusable UI components
    - `navbar.tsx` - Navigation with blog and works links
    - `theme-provider.tsx` & `theme-switch.tsx` - Theme management
    - `transition.tsx` - Page transitions with Framer Motion
    - `logo.tsx` - Site logo component
    - `icons/` - Custom icon components
- `src/lib/` - Data fetching utilities
    - `blog.ts` - GraphQL queries and caching for blog posts
    - `work.ts` - GraphQL queries and caching for portfolio works
- `src/validators/` - Zod schema validation
    - `blog.ts` - Type-safe blog data validation
    - `work.ts` - Type-safe work data validation

### Key Features

- **Static Export**: Configured for static deployment
- **Theme System**: Dark/light mode with system preference detection
- **Blog System**: Full blog with posts fetched from Hygraph CMS
- **Portfolio Integration**: Works/projects fetched from Hygraph CMS via GraphQL
- **Type Safety**: Comprehensive TypeScript with Zod runtime validation
- **Responsive Design**: Mobile-first with TailwindCSS
- **SEO Optimized**: Comprehensive metadata and OpenGraph tags

### Data Flow

- Both blog posts and portfolio works are fetched from Hygraph CMS using GraphQL
- Environment variable `GRAPHCMS_ENDPOINT` required for CMS connection
- Uses React cache for GraphQL queries to optimize performance
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
