# Session Outbox
<!-- When a Claude Code session completes notable work, add a line here. -->
<!-- Format: - [DATE] [TYPE] Description -->
<!-- Types: FEATURE, DECISION, PATTERN, BLOCKER, REQUEST -->
<!-- The command center reads all outboxes on session start. -->

- [2026-03-29] [REQUEST] Add admin-data API endpoints so hub can read SamsOath data (read-only, SamsOath admin stays independent). Need 6 endpoints with FRANKVENTURE_ADMIN_SECRET auth: /api/admin-data/users (OATH taker count), /api/admin-data/revenue (donation totals from Stripe), /api/admin-data/signups (newsletter subscribers), /api/admin-data/activity (recent OATHs, stories), /api/admin-data/marketing (social stats), /api/admin-data/actions (action proxy). Follow same pattern as NTT/SS.
