# Supabase Integration Examples

This file shows how to integrate the `@mbtq/database` package with existing components.

## Initialize Supabase in Your App

```typescript
// apps/web/src/main.tsx
import { initSupabase } from '@mbtq/database';

// Initialize Supabase before rendering
initSupabase();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## QuantumSnippets with Database

```typescript
import { useState, useEffect } from 'react';
import { QuantumSnippets } from '@mbtq/quantum-core';
import { getSupabase } from '@mbtq/database';

export function QuantumSnippetsWithDB() {
  const [snippets, setSnippets] = useState([]);
  const supabase = getSupabase();

  // Load snippets on mount
  useEffect(() => {
    loadSnippets();
  }, []);

  const loadSnippets = async () => {
    const { data, error } = await supabase
      .from('snippets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      setSnippets(data.map(s => ({
        lang: s.language,
        code: s.code,
        emoji: s.emoji,
        id: s.id
      })));
    }
  };

  const saveSnippet = async (snippet) => {
    const { data, error } = await supabase
      .from('snippets')
      .insert({
        language: snippet.lang,
        code: snippet.code,
        emoji: snippet.emoji,
        is_public: false
      });
    
    if (!error) {
      await loadSnippets();
    }
  };

  const deleteSnippet = async (id) => {
    await supabase.from('snippets').delete().eq('id', id);
    await loadSnippets();
  };

  return (
    <QuantumSnippets 
      snippets={snippets}
      onSave={saveSnippet}
      onDelete={deleteSnippet}
    />
  );
}
```

## SaaS Templates with Database

```typescript
import { useState, useEffect } from 'react';
import { SaaSTemplateGen } from '@mbtq/codegen';
import { getSupabase } from '@mbtq/database';

export function SaaSTemplateGenWithDB() {
  const [templates, setTemplates] = useState([]);
  const supabase = getSupabase();

  const saveTemplate = async (template) => {
    const { data, error } = await supabase
      .from('templates')
      .insert({
        name: template.name,
        type: template.type,
        code: template.code,
        language: template.language,
        is_public: true // Make templates public by default
      });
    
    if (!error) {
      alert('Template saved to database! ✨');
    }
  };

  const loadTemplates = async (type: string) => {
    const { data } = await supabase
      .from('templates')
      .select('*')
      .eq('type', type)
      .eq('is_public', true);
    
    return data || [];
  };

  return (
    <SaaSTemplateGen 
      onSave={saveTemplate}
      onLoad={loadTemplates}
    />
  );
}
```

## PinkSync Workspace with Database

```typescript
import { useState, useEffect } from 'react';
import { PinkSyncWidget } from '@mbtq/pinksync';
import { getSupabase } from '@mbtq/database';

export function PinkSyncWithDB() {
  const [workspaceId, setWorkspaceId] = useState(null);
  const [widgets, setWidgets] = useState([]);
  const supabase = getSupabase();

  useEffect(() => {
    loadWorkspace();
  }, []);

  const loadWorkspace = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return;

    // Get or create workspace
    let { data: workspace } = await supabase
      .from('workspaces')
      .select('*')
      .eq('user_id', user.user.id)
      .single();

    if (!workspace) {
      const { data: newWorkspace } = await supabase
        .from('workspaces')
        .insert({ name: 'My Workspace', widgets: [] })
        .select()
        .single();
      workspace = newWorkspace;
    }

    if (workspace) {
      setWorkspaceId(workspace.id);
      setWidgets(workspace.widgets || []);
    }
  };

  const saveWidgetPosition = async (widgetData) => {
    if (!workspaceId) return;

    const updatedWidgets = [...widgets, widgetData];
    
    await supabase
      .from('workspaces')
      .update({ widgets: updatedWidgets })
      .eq('id', workspaceId);
    
    setWidgets(updatedWidgets);
  };

  return (
    <PinkSyncWidget 
      onMove={saveWidgetPosition}
      onResize={saveWidgetPosition}
    />
  );
}
```

## Authentication UI

```typescript
import { useState } from 'react';
import { getSupabase } from '@mbtq/database';

export function AuthComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const supabase = getSupabase();

  // Listen to auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) alert(error.message);
    else alert('Check your email for confirmation!');
  };

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="p-4 bg-fuchsia-50 rounded">
        <p>Welcome, {user.email}!</p>
        <button onClick={signOut} className="px-4 py-2 bg-fuchsia-600 text-white rounded mt-2">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold text-fuchsia-700 mb-4">Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-2"
      />
      <div className="flex gap-2">
        <button onClick={signIn} className="px-4 py-2 bg-fuchsia-600 text-white rounded">
          Sign In
        </button>
        <button onClick={signUp} className="px-4 py-2 bg-blue-600 text-white rounded">
          Sign Up
        </button>
      </div>
    </div>
  );
}
```

## Real-time Collaboration

```typescript
import { useEffect } from 'react';
import { getSupabase } from '@mbtq/database';

export function useRealtimeWorkspace(workspaceId: string, onUpdate: (data: any) => void) {
  const supabase = getSupabase();

  useEffect(() => {
    const channel = supabase
      .channel(`workspace-${workspaceId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workspaces',
          filter: `id=eq.${workspaceId}`,
        },
        (payload) => {
          onUpdate(payload.new);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [workspaceId]);
}
```

## Environment Variables Example

Create `apps/web/.env`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://xyzcompany.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: Socket.IO Server (if not using default)
VITE_SOCKET_SERVER_URL=http://localhost:4000
```
