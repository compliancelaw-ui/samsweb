---
name: admin-center-hands-off
description: SamsOath /admin is being migrated to Frankventure command center in a separate session - do not modify
type: project
---

The SamsOath admin center (/admin, /api/admin/*) is being handled in a separate Frankventure command center session. Do not modify admin pages, admin API routes, or admin components in SamsOath product sessions.

**Why:** Frank is consolidating admin functionality into the Frankventure hub command center.
**How to apply:** When working on SamsOath, only touch public-facing pages, components, and non-admin API routes. If a change requires admin-side updates, note it for the command center session instead.
