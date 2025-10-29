Title
Recipe Ideas — React + Vite + TheMealDB

Overview
A fast, minimal recipe finder for Taylor to search by ingredient and view full recipe details. Built with React (Vite) and Tailwind CSS, fetching data from TheMealDB public API with no authentication required. This matches the “Recipe Ideas” user need from the take‑home brief.​

Working with AI

Conversation link: https://www.perplexity.ai/search/today-i-recived-a-task-from-co-oJ1GGXe.QrGyavEDk7Enqw
This link shows the reasoning, design decisions, routing setup, UI theme, debugging, and deployment steps.​

Live Demo

StackBlitz: https://stackblitz.com/~/github.com/shailu0007/recipe-Ideas
Open in an incognito window to verify public access. If needed, also add a CodeSandbox link.​

Features

Search by ingredient and see image cards of matching meals.​

Tap a meal to view full details: ingredients and step‑by‑step instructions.​

Clean loading, error, and empty states; responsive grid; yellow–orange–white theme.​

Modern routing with a shared layout via Outlet; direct-route refresh works on hosts that support SPA routing.​

Tech Stack

Frontend: React + Vite (ES modules, fast dev server, optimized build).​

Styling: Tailwind CSS utilities for rapid, responsive UI.​

Routing: React Router with a layout route and Outlet for persistent header/footer.​

API Endpoints

List by ingredient: https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}
Returns meals with id, name, and thumbnail; some queries can return null, handled defensively.​

Lookup details by id: https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}
Returns full details including instructions and ingredient/measure pairs.​

Project Structure

src/pages/Home.jsx: Ingredient search, results grid, hero section with centered content.

src/pages/MealDetails.jsx: Details view with ingredients grid, instructions, and YouTube link.

src/routes.jsx: Routes with a RootLayout and Outlet.

src/root-layout.jsx: Full‑width header, constrained main, and footer.

src/services/mealdb.js: API helpers for filter and lookup endpoints.​

public/: Static assets such as favicon.​

Local Development
Prerequisites

Node.js 18+ and npm.

Install and Run

npm install

npm run dev
Open the local URL printed in the terminal.​

Build and Preview

npm run build

npm run preview
Serves the production build locally.​

Deployment

Preferred: StackBlitz or CodeSandbox public link; they auto-run Vite and provide a shareable URL.​

Static hosts: For Netlify/Vercel/GitHub Pages, ensure SPA fallback so “/meal/:id” refresh loads index.html:

Netlify: add a _redirects file with “/* /index.html 200”.

Vercel: uses framework presets.

GitHub Pages: serve index.html on 404 or include a 404.html copy of index.html.​

Accessibility and UX Notes

High-contrast white search input with visible focus ring for clarity atop the orange/yellow gradient.​

Buttons and links maintain accessible color contrast; focus styles are enabled.​

Layout is responsive with readable line lengths inside max-width containers.​

Limitations

TheMealDB free tier supports single-ingredient filtering; there is no official prep-time field. “Quick” mode (if enabled) can use a simple instruction-length heuristic.​

Working with AI Rubric Note

The AI conversation URL demonstrates requirement interpretation, technology choices, API selection, routing with Outlet, UI/UX theme decisions, troubleshooting (branch naming, favicon, routing/width fixes), and deployment validation.​

License

MIT (optional — add your chosen license text and a LICENSE file if you want).

Credits

Data: TheMealDB (public, no-auth API).​

Starter configuration: Vite React template.​

Reviewer Quick Start

Live Demo: https://stackblitz.com/~/github.com/shailu0007/recipe-Ideas​

Search “chicken,” click a meal card, verify ingredients and instructions, then refresh on the details route to validate SPA routing.