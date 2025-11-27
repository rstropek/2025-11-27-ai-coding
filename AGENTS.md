## Project Overview

This is a Next.js 16 application for BikeShop, a bicycle retail store. The application showcases bikes and accessories with a product catalog interface.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build production version
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Technology Stack

- **Framework**: Next.js 16.0.1 with App Router
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: CSS Modules (no Tailwind)
- **Icons**: lucide-react

### Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout with NotificationProvider
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   └── page.module.css    # Page-specific styles
├── components/            # Reusable React components
│   ├── Header.tsx         # Main navigation with notification bell
│   ├── Breadcrumb.tsx     # Breadcrumb navigation
│   ├── Card.tsx           # Product card component
│   ├── NotificationBell.tsx    # Notification bell icon with badge
│   └── NotificationPopup.tsx   # Notification dropdown popup
└── contexts/              # React Context providers
    └── NotificationContext.tsx # Notification state management
```

### Styling Architecture

**Important**: This project uses regular CSS Modules, NOT Tailwind CSS.

- Each component has its own `.module.css` file
- Global styles are in `src/app/globals.css`
- Color scheme:
  - Primary Green: `#2D9B4F` (header background)
  - Primary Orange: `#FF6B35` (text, buttons, links)
  - Background Gray: `#f5f5f5`
  - Notification Badge Blue: `#007bff`

### Component Architecture

**Layout Components**:

- `Header`: Green top bar with logo, vertical separator, navigation menu (left-aligned), and notification bell (right-aligned)
- `Breadcrumb`: Navigation breadcrumbs with consistent left-alignment to header logo

**Content Components**:

- `Card`: Reusable product card with category label, title, description, primary CTA button, and secondary action links
- `NotificationBell`: Bell icon with unread count badge, displays notification popup on click
- `NotificationPopup`: Dropdown popup showing notification list (currently with placeholder content)

**State Management**:

- `NotificationContext`: React Context providing notification state (unread count) accessible throughout the app
  - Default unread count: 3 (for demo purposes)
  - Accessible via `useNotifications()` hook
  - Wrapped around app in `layout.tsx`

**Container Pattern**:

All layout components (Header, Breadcrumb) use a consistent container pattern:

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}
```

This ensures consistent alignment across the page.

### Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@/*` maps to `./src/*`

Example: `import Header from '@/components/Header'`

## Key Design Decisions

1. **No Tailwind**: Explicitly uses vanilla CSS/CSS Modules. Do not introduce Tailwind classes.
2. **Consistent Alignment**: All content containers use 1200px max-width and are horizontally centered.
3. **Component Modularity**: Each component is self-contained with its own styles and TypeScript types.

## Notification System

### API Endpoints

#### `GET /api/notifications/stream`

Server-Sent Events (SSE) endpoint for real-time notification streaming:

- Keeps connection open and streams notifications to connected clients
- Each event is a JSON object with `title`, `text`, and `icon` fields
- Notifications are ephemeral (in-memory only, not persisted)
- Automatically reconnects on connection loss
- No authentication required

Example notification event:

```json
{
  "title": "Server Update",
  "text": "The backend was restarted successfully.",
  "icon": "server"
}
```

#### `POST /api/notifications`

Allows external systems to trigger notifications:

- Request body requires `title`, `text`, and `icon` fields
- Broadcasts notification to ALL connected SSE clients
- Returns 400 if required fields are missing
- No authentication required

Example request:

```bash
curl -X POST http://localhost:3000/api/notifications \
  -H "Content-Type: application/json" \
  -d '{"title":"Build Completed","text":"Frontend build completed successfully.","icon":"check-circle"}'
```

### Client-Side Implementation

**NotificationContext**:

- Manages notification state and SSE connection
- Automatically connects to `/api/notifications/stream` on mount
- Stores notifications in-memory with unique IDs and timestamps
- `unreadCount` is computed from the notifications array length
- Provides `notifications` array and `unreadCount` to components via context

**NotificationPopup**:

- Displays list of notifications with icons from lucide-react
- Shows icon, title (bold), and text for each notification
- Empty state: "You have no notifications yet"
- Icons are dynamically resolved from icon name (e.g., "check-circle" → CheckCircle)
- Scrollable list with max-height of 400px

**NotificationBell**:

- Badge displays `unreadCount` from context
- Opens popup on click to show notification list

### Design Decisions

- **No Persistence**: Notifications are ephemeral and stored only in-memory on both client and server
- **No Authentication**: API endpoints are open (can be added later if needed)
- **Automatic Reconnection**: EventSource automatically reconnects on connection loss
- **No Dismissal**: Notifications cannot be cleared in this implementation (planned for future)
