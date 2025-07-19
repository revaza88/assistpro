# AssistPro Local Development Setup

## Prerequisites
Ensure Node.js 18+ is installed:
```bash
node --version
npm --version
```

## Quick Start
1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open browser at: http://localhost:5000

## Production Test
To test production build locally:
```bash
npm run build
npm start
```
Then open: http://localhost:3000

## Common Issues
- If port 5000 is occupied: `npm run dev -- --port 3001`
- If build fails: Check Node.js version (needs 18+)
- If modules missing: Delete node_modules and run `npm install` again

## Project Structure
- Frontend: React + TypeScript + Vite
- Backend: Express.js
- UI: Tailwind CSS + Radix UI components
- Forms: React Hook Form + Zod validation
