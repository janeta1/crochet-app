# Stitchbook 🧶

A cozy crochet project manager built for crafters who want to keep track of their works in progress, yarn stash, and crochet sessions.

## Live Demo
...

## Features

### Projects
- Add, edit and delete crochet projects
- Track progress through multi-part row counting
- Log crochet sessions with notes, duration and row updates
- Support for frogging (negative row updates)
- Link yarns from your stash to projects
- Upload a project photo or pick a color
- Mark projects as Queued, In Progress or Done
- Favorite projects for quick access

### Yarn Stash
- Manage your yarn collection with brand, weight, color and quantity
- Filter yarns by weight
- Link yarns to projects

### Favorites
- Quick access to your favorite projects with full detail view

### General
- Light and dark mode (preference saved across sessions)
- Fully responsive — works on mobile and desktop
- All data stored locally in your browser (IndexedDB)
- No account needed, no data leaves your device

## Tech Stack
- React + Vite
- Tailwind CSS
- React Router
- IndexedDB (via idb)
- Hosted on GitHub Pages

## Running Locally

```bash
git clone https://github.com/YOUR_USERNAME/crochet-app.git
cd crochet-app
npm install
npm run dev
```

## Project Structure
```
src/
├── components/    # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks (useProjects, useYarns)
├── db/            # IndexedDB setup and queries
├── data/          # Sample data
└── utils/         # Utility functions
```