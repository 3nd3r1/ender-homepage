# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production (static export)
- `npm run start` - Build and start production server

### Notes

- This project uses static export mode (`output: "export"` in next.config.mjs)
- No test scripts are configured in package.json

## Architecture

This is Viljami Ranta's personal homepage built with Next.js 14, featuring a portfolio section with works fetched from Hygraph (GraphCMS).

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: TailwindCSS + SCSS
- **Content**: GraphQL + Hygraph CMS
- **Animations**: Framer Motion
- **Theme**: next-themes for dark/light mode
- **TypeScript**: Full TypeScript support

### Project Structure

- `src/app/` - Next.js App Router pages and layouts
    - `layout.tsx` - Root layout with theme provider and navigation
    - `page.tsx` - Homepage with bio, socials, and personal info
    - `works/` - Portfolio section pages
- `src/components/` - Reusable UI components
    - Theme switching and providers
    - Navigation and transitions
    - Icons
- `src/lib/` - Type definitions and utilities
- `src/services/` - External API interactions (GraphQL queries to Hygraph)

### Key Features

- **Static Export**: Configured for static deployment
- **Theme System**: Dark/light mode with system preference detection
- **Portfolio Integration**: Works/projects fetched from Hygraph CMS via GraphQL
- **Responsive Design**: Mobile-first with TailwindCSS
- **SEO Optimized**: Comprehensive metadata and OpenGraph tags

### Data Flow

- Works/portfolio content is fetched from Hygraph CMS using GraphQL
- Environment variable `GRAPHCMS_ENDPOINT` required for CMS connection
- Uses React cache for GraphQL queries
- Type-safe GraphQL with `@graphql-typed-document-node/core`

### Configuration Files

- `next.config.mjs` - Static export, image optimization disabled, Hygraph remote patterns
- `tailwind.config.ts` - TailwindCSS configuration
- `postcss.config.mjs` - PostCSS for TailwindCSS
