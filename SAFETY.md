# Platform Safety Features

This document outlines the safety and privacy features built into the platform to ensure it remains a safe hosting space for LGBTQ+ and Deaf communities.

## 🔒 Privacy Features

### Data Visibility Controls

Users have granular control over data visibility:

```typescript
// Snippets can be public or private
await supabase.from('snippets').insert({
  code: '...',
  is_public: false  // Only visible to creator
});

// Templates can be shared selectively
await supabase.from('templates').insert({
  code: '...',
  is_public: true  // Visible to all authenticated users
});
```

### Row Level Security (RLS)

All database tables use PostgreSQL RLS policies:
- Users can only access their own private data
- Public content requires authentication to view
- No unauthenticated data access
- Automatic filtering of unauthorized content

### Pseudonymous Profiles

Users are **not required** to provide:
- Real names
- Gender information
- Location data
- Personal identifiers

The platform supports fully pseudonymous participation.

### Data Portability

Users can:
- Export all their data at any time
- Delete their account and all associated data
- Transfer data to other platforms
- Control data retention policies

## 🛡️ Content Safety

### Reporting System

**Status**: 🚧 To Be Implemented

Planned features:
- Report button on all user-generated content
- Anonymous reporting option
- Multiple report categories (harassment, spam, hate speech, etc.)
- Automated escalation for urgent reports

### Content Moderation

**Status**: 🚧 To Be Implemented

Planned features:
- Community moderator dashboard
- Flagged content queue
- Automated harassment detection
- Context-aware moderation (understanding LGBTQ+/Deaf culture)

### Blocking and Filtering

**Status**: 🚧 To Be Implemented

Planned features:
- Block users from seeing your content
- Mute users without notifying them
- Filter content by keywords
- Hide specific types of content

## ♿ Accessibility Safety

### Visual Alternatives to Audio

All platform features provide visual equivalents:
- **Visual alerts** instead of sound notifications
- **Text-based feedback** for all actions
- **High contrast modes** for visibility
- **No audio-only content** allowed

### Screen Reader Support

- All interactive elements have ARIA labels
- Semantic HTML structure
- Keyboard navigation for all features
- Focus indicators clearly visible

### Testing

Built-in accessibility testing:
- Automated axe-core checks
- WCAG 2.1 AA compliance
- Manual testing protocols
- Community feedback integration

## 🔐 Authentication Security

### Supabase Auth

Platform uses Supabase authentication with:
- **Email verification** required for signup
- **Password strength** requirements
- **Session management** with automatic refresh
- **JWT tokens** for secure API access
- **OAuth providers** for optional social login

### Multi-Factor Authentication (MFA)

**Status**: 🚧 To Be Implemented

Planned:
- Optional TOTP-based MFA
- Recovery codes
- Device management

## 🚨 Emergency Features

### Panic Button

**Status**: 🚧 To Be Implemented

Planned:
- One-click hide all personal content
- Temporary account deactivation
- Emergency contact notification

### Safety Mode

**Status**: 🚧 To Be Implemented

Planned:
- Extra content filtering
- Require approval for new connections
- Enhanced privacy settings
- Limited visibility profile

## 📊 Transparency

### Moderation Reports

Platform will publish:
- Quarterly moderation statistics
- Anonymized enforcement examples
- Policy updates and rationale
- Community feedback incorporation

### Data Practices

- No sale of user data
- Minimal data collection
- Clear privacy policy
- Open source code for auditing

## 🤝 Community Safety Team

### Moderator Diversity

Safety team should include:
- Deaf and Hard of Hearing moderators
- LGBTQ+ community representatives
- Different timezone coverage
- Cultural and linguistic diversity

### Moderator Training

Required training covers:
- Deaf culture and communication
- LGBTQ+ terminology and issues
- Bias recognition and mitigation
- De-escalation techniques
- Privacy and confidentiality

## 🔧 Implementation Status

| Feature | Status | Priority |
|---------|--------|----------|
| RLS Policies | ✅ Implemented | Critical |
| Data Export | ✅ Implemented | Critical |
| Content Reporting | 🚧 Planned | High |
| User Blocking | 🚧 Planned | High |
| Moderation Dashboard | 🚧 Planned | High |
| Automated Detection | 🚧 Planned | Medium |
| MFA | 🚧 Planned | Medium |
| Panic Button | 🚧 Planned | Low |

## 📝 Reporting Issues

To report safety concerns:

1. **Technical issues**: Open a GitHub issue with `[SAFETY]` tag
2. **Moderation needs**: Contact safety@mbtq.dev
3. **Urgent threats**: Contact platform administrators immediately

## 🔄 Updates

This document is regularly updated as safety features are implemented. Last updated: 2025-12-05

---

**Note**: This platform is community-driven. Safety features are developed with community input and prioritized based on community needs.
