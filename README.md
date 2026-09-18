# Flowdesk

Flowdesk is a frontend-only customer support operations workspace. It gives support teams one place to manage conversations, tickets, customers, teammates, and service analytics.

The project is built as a realistic SaaS product prototype: it uses polished responsive UI, reusable React components, realistic mock data, and local state to simulate the workflows a production support platform would need.

## What is included

- Overview dashboard with support KPIs, ticket volume trends, recent conversations, and team activity
- Three-column support inbox with conversation filters, message history, assignments, priorities, and reply composition
- Ticket management with search, filtering, sorting, creation, detail views, status updates, assignees, priorities, tags, and activity history
- Customer directory with search, filters, customer profiles, statistics, conversations, tickets, and activity
- Support analytics with ticket volume, resolution rate, response time, CSAT, category breakdowns, and agent performance
- Team management with role filtering, member search, team metrics, and an add-member modal
- Settings for profile, workspace, notification preferences, and light/dark/system appearance modes
- Global search across tickets, customers, and conversations
- Toast feedback, dropdown menus, tabs, modals, empty states, responsive navigation, and keyboard-friendly controls

## Tech stack

- React 18
- JavaScript and JSX
- Vite
- Tailwind CSS
- React Router
- Lucide React icons
- Recharts
- `clsx` for conditional class names

## Getting started

### Requirements

- Node.js 18 or newer
- npm 9 or newer

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite serves the app at [http://localhost:5173](http://localhost:5173).

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Application routes

| Route        | Purpose                                                    |
| ------------ | ---------------------------------------------------------- |
| `/`          | Overview dashboard                                         |
| `/inbox`     | Customer conversations and replies                         |
| `/tickets`   | Ticket list, filters, creation, and ticket detail          |
| `/customers` | Customer directory and profiles                            |
| `/analytics` | Support performance analytics                              |
| `/team`      | Team member management                                     |
| `/settings`  | Profile, workspace, notifications, and appearance settings |
| `/help`      | Help center placeholder                                    |

## Project structure

```text
src/
  components/       Shared shell and reusable UI components
  context/          App state, theme, and toast providers
  data/             Realistic mock customers, tickets, conversations, and analytics
  pages/            Route-level workspace screens
  utils/            Formatting and display helpers
  App.jsx           Route configuration
  main.jsx          React providers and application entry point
  index.css         Tailwind layers and global visual styles
```

## State and data model

Flowdesk intentionally has no backend or authentication service yet. The application starts from the mock data in `src/data/mockData.js` and manages interactive changes with React context in `src/context/AppStateContext.jsx`.

The current frontend simulates:

- Creating tickets
- Updating ticket status, priority, and assignment
- Sending conversation messages
- Updating conversation status
- Adding team members
- Dismissing notifications
- Persisting the selected theme in `localStorage`

Changes are stored in memory and reset when the page is reloaded, except for the selected theme preference. The context methods are the main integration boundary for connecting the UI to API calls, authentication, and persistent data later.

## Design direction

The interface uses a restrained operations-focused visual system: dense but readable layouts, subtle borders, small-radius surfaces, clear status colors, responsive behavior, and a teal-and-ink Flowdesk identity. The primary experience is the authenticated workspace rather than a marketing landing page.

## Connecting a backend later

A backend integration can be added without replacing the page structure by updating the state providers and data access boundary:

1. Replace mock-data initialization with API queries or a client-side data layer.
2. Map create and update actions in `AppStateContext.jsx` to authenticated API requests.
3. Add loading, error, retry, and optimistic update handling around those requests.
4. Add authentication and workspace permission checks around the existing routes.
5. Keep the reusable components and page-level workflows unchanged where possible.

## Current limitations

- No backend, database, authentication, or real-time transport
- No persistent ticket or customer storage
- Charts use static mock analytics data
- The Help Center is currently a frontend placeholder
- There is no automated test suite or lint script configured yet
