# Ben Chamberlain - Pokédex App

**Live Demo:** [bc-pokedex.vercel.app/](https://bc-pokedex.vercel.app/)

## Overview

A fully interactive Pokédex application powered by REST calls to [PokéAPI](https://pokeapi.co/).

This project acts as a sandbox for exploring creative UI solutions, server-driven rendering, caching, typed API integration, and scalable, high-performance UI components.

## Site Structure

The application is organized using the Next.js App Router. These are the current routes:

`/` – Searchable Pokémon grid with filtering & lazy loading

`/[name]` – Dynamic Pokémon detail pages

## Features

- Pokémon Grid with search and filtering capabilities
- Detailed Pokémon info pages including:
  - Pokémon Type, Abilities, and Egg Moves
  - Evolution path visualization (with recursive dynamic arrow rendering)
  - Paginated table of its learned moves (lazy-loaded for performance)
  - Bar chart of the Pokémon's base stats with dynamic scaling
  - Navigation between adjacent Pokémon in the Pokédex

## Architecture & Technical Highlights

- Parallel data fetching with `Promise.all` for improved load performance
- Strategic caching and revalidation for API efficiency
- Lazy-loading heavy data (e.g. move details) only when needed
- Dynamic routes and search parameter handling with the Next.js App Router
- Typed API integration using `pokenode-ts`
- Generic, reusable table components built with `@tanstack/react-table`
- Custom bar chart visualization for Pokémon stats
- Server-Side Data Fetching using `Next.js` server components
- Incremental Static Rendering (ISR) where appropriate
