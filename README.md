# Ben Chamberlain - Personal Website

**Live Demo:** [benchamberlain.vercel.app](https://benchamberlain.vercel.app/)

## About

This is the code repository for my personal portfolio site. I started this repository in **Janurary 2026** to create fun, creative projects and experiement with different coding techniques.

This project is built with **TypeScript**, **React 19**, and **Next.js**, leveraging:

- **TailwindCSS** for utility-first styling
- Customized **Shadcn UI** components for consistent, accessible design
- React Server Components (RSC) for reduced client-side bundle size
- SSR and streaming for fast initial render and improved SEO

My goal is to create scalable, accessible, and modern user interfaces with a strong focus on performance and thoughtful user experience.

## Site Structure

The application is organized using the Next.js App Router. These are the current routes:

`/` – Landing page (personal introduction & about section)

`/pokedex` – Searchable Pokémon grid with filtering & lazy loading

`/pokedex/[name]` – Dynamic Pokémon detail pages

## Project Showcase: Interactive Pokédex

### _Overview_

A fully interactive Pokédex application powered by REST calls to the public [PokéAPI](https://pokeapi.co/).

This project acts as a sandbox for exploring server-driven rendering, typed API integration, and scalable, high-performance UI components.

### _Features_

- Pokémon Grid with search and filtering capabilities
- Detailed Pokémon info pages including:
  - Pokémon Type, Abilities, and Egg Moves
  - Evolution path visualization (with recursive dynamic arrow rendering)
  - Paginated table of its learned moves (lazy-loaded for performance)
  - Bar chart of the Pokémon's base stats with dynamic scaling
  - Navigation between adjacent Pokémon in the Pokédex

### _Architecture & Technical Highlights_

- Parallel data fetching with `Promise.all` for improved load performance
- Strategic caching and revalidation for API efficiency
- Lazy-loading heavy data (e.g. move details) only when needed
- Dynamic routes and search parameter handling with the Next.js App Router
- Typed API integration using `pokenode-ts`
- Generic, reusable table components built with `@tanstack/react-table`
- Custom bar chart visualization for Pokémon stats
- Server-Side Data Fetching using `Next.js` server components
- Incremental Static Rendering (ISR) where appropriate
