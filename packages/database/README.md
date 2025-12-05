# @mbtq/database

Supabase database integration for mbtq Quantum Dev platform.

## Features

- 🔐 **Authentication** - Supabase Auth integration with user profiles
- 📝 **Code Snippets** - Persistent storage for code snippets (Zod, Rust, TS, HTML, Deno)
- 🏗️ **SaaS Templates** - Store and share generated templates
- 💼 **Workspaces** - Save widget positions and settings
- 🔒 **Row Level Security** - Secure data access with RLS policies
- 🔄 **Real-time** - Supabase Realtime for live collaboration

## Installation

This package is part of the mbtq monorepo and uses workspace dependencies:

```bash
pnpm install
```

## Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and anon key from Settings > API

### 2. Run Database Schema

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `packages/database/supabase/schema.sql`
4. Run the SQL to create tables, policies, and triggers

### 3. Configure Environment Variables

Create `.env` file in your app root or `apps/web/.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Usage

### Initialize Supabase Client

```typescript
import { initSupabase } from '@mbtq/database';

// Initialize once at app startup
const supabase = initSupabase();
```

### Authentication

```typescript
import { getSupabase } from '@mbtq/database';

const supabase = getSupabase();

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword',
  options: {
    data: {
      name: 'User Name',
    },
  },
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword',
});

// Sign out
await supabase.auth.signOut();

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

### Code Snippets

```typescript
import { getSupabase } from '@mbtq/database';

const supabase = getSupabase();

// Create snippet
const { data, error } = await supabase
  .from('snippets')
  .insert({
    language: 'typescript',
    code: 'const hello = "world";',
    emoji: '💠',
    title: 'Hello World',
    is_public: false,
  });

// Get user's snippets
const { data, error } = await supabase
  .from('snippets')
  .select('*')
  .order('created_at', { ascending: false });

// Get public snippets
const { data, error } = await supabase
  .from('snippets')
  .select('*')
  .eq('is_public', true);

// Update snippet
const { data, error } = await supabase
  .from('snippets')
  .update({ code: 'const hello = "updated";' })
  .eq('id', snippetId);

// Delete snippet
const { data, error } = await supabase
  .from('snippets')
  .delete()
  .eq('id', snippetId);
```

### SaaS Templates

```typescript
import { getSupabase } from '@mbtq/database';

const supabase = getSupabase();

// Save template
const { data, error } = await supabase
  .from('templates')
  .insert({
    name: 'Dashboard Template',
    type: 'dashboard',
    code: '<div>Dashboard HTML...</div>',
    language: 'html',
    is_public: true,
  });

// Get templates by type
const { data, error } = await supabase
  .from('templates')
  .select('*')
  .eq('type', 'dashboard');
```

### Workspaces

```typescript
import { getSupabase } from '@mbtq/database';

const supabase = getSupabase();

// Save workspace
const { data, error } = await supabase
  .from('workspaces')
  .insert({
    name: 'My Quantum Workspace',
    widgets: [
      { id: 'widget-1', x: 100, y: 120, w: 420, h: 220 },
    ],
    settings: {
      theme: 'quantum',
      contrast: false,
    },
  });

// Update workspace
const { data, error } = await supabase
  .from('workspaces')
  .update({
    widgets: updatedWidgets,
  })
  .eq('id', workspaceId);
```

### Real-time Subscriptions

```typescript
import { getSupabase } from '@mbtq/database';

const supabase = getSupabase();

// Subscribe to workspace changes
const channel = supabase
  .channel('workspace-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'workspaces',
      filter: `id=eq.${workspaceId}`,
    },
    (payload) => {
      console.log('Workspace updated:', payload);
    }
  )
  .subscribe();

// Unsubscribe
channel.unsubscribe();
```

## Database Schema

### Tables

- **users** - User profiles (linked to Supabase Auth)
- **snippets** - Code snippets with language and visibility
- **templates** - SaaS templates with type and code
- **workspaces** - Widget positions and user settings

### Row Level Security

All tables have RLS policies enabled:
- Users can only access their own data
- Public snippets/templates are visible to all authenticated users
- Automatic user profile creation on signup

## TypeScript Types

The package exports TypeScript types for all database tables:

```typescript
import type { Database } from '@mbtq/database';

type Snippet = Database['public']['Tables']['snippets']['Row'];
type Template = Database['public']['Tables']['templates']['Row'];
```

## Generating Types

To regenerate TypeScript types from your Supabase schema:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > packages/database/src/types.ts
```

## Integration Examples

### With QuantumSnippets Component

```typescript
import { QuantumSnippets } from '@mbtq/quantum-core';
import { getSupabase } from '@mbtq/database';

function App() {
  const supabase = getSupabase();
  
  // Load snippets from database on mount
  useEffect(() => {
    loadSnippets();
  }, []);
  
  const loadSnippets = async () => {
    const { data } = await supabase
      .from('snippets')
      .select('*');
    setSnippets(data || []);
  };
  
  const saveSnippet = async (snippet) => {
    await supabase.from('snippets').insert(snippet);
  };
  
  return <QuantumSnippets onSave={saveSnippet} />;
}
```

### With PinkSync Widget

```typescript
import { PinkSyncWidget } from '@mbtq/pinksync';
import { getSupabase } from '@mbtq/database';

function App() {
  const supabase = getSupabase();
  
  const saveWorkspace = async (widgets) => {
    await supabase
      .from('workspaces')
      .upsert({
        id: workspaceId,
        widgets: widgets,
      });
  };
  
  return <PinkSyncWidget onMove={saveWorkspace} />;
}
```

## License

Open source. Part of mbtq.dev platform.
