# Odette FE Learning Roadmap

This roadmap is tailored to your current codebase and ordered by highest impact first.

## How To Use This File

1. Follow the topic order strictly.
2. Finish the weekly tasks before moving to the next week.
3. Keep a short study log after each day: what you learned, what was unclear, and what you will apply.
4. Apply changes in small batches and test each batch.

## Exact Topics In Order

1. Threat modeling for frontend auth
2. JWT anatomy and validation rules
3. Secure session transport with cookies (HttpOnly, Secure, SameSite)
4. CSRF basics for cookie-based auth
5. Server-authoritative authorization (RBAC)
6. Token lifecycle design (issue, refresh, rotate, revoke)
7. Next.js middleware auth patterns
8. Auth state architecture in React apps
9. Separation of concerns in API clients
10. TypeScript strict mode mindset
11. Modeling API contracts with DTOs
12. Generic API function design
13. Runtime validation for untrusted data
14. Error taxonomy and handling strategy
15. React effects mental model
16. Exhaustive dependencies done correctly
17. Cleanup patterns in effects
18. Refs and DOM typing in TypeScript
19. Browser API typing extensions
20. React list reconciliation and keys
21. Guarded rendering state machines
22. Consistent logout/session invalidation
23. Code hygiene and dead code policy
24. Lint strategy for long-term quality
25. Testing auth and routing behavior
26. Security regression checklist before release

## Bigger Picture and Why (With Related Files)

1. Threat modeling for frontend auth
Bigger picture: define trust boundaries and attacker capability before changing implementation.
Why in this project: auth tokens and session data are handled in browser-accessible storage.
Related files: src/features/auth/login/index.tsx, src/utils/api.ts, src/utils/logout.ts

2. JWT anatomy and validation rules
Bigger picture: parsing a JWT is not the same as proving it is valid.
Why in this project: role logic is influenced by decoded token payload.
Related files: src/utils/auth.ts, src/middleware.ts

3. Secure session transport with cookies
Bigger picture: session transport choices directly affect XSS and token theft risk.
Why in this project: current token usage is read and written by client JavaScript.
Related files: src/features/auth/login/index.tsx, src/utils/api.ts

4. CSRF basics for cookie-based auth
Bigger picture: moving to safer cookie sessions requires CSRF mitigation.
Why in this project: requests are credentialed and session handling is evolving.
Related files: src/utils/api.ts

5. Server-authoritative authorization (RBAC)
Bigger picture: client-side role checks are UX helpers, not security controls.
Why in this project: role and permission checks currently rely on client-available state.
Related files: src/hooks/auth.ts, src/middleware.ts

6. Token lifecycle design (issue, refresh, rotate, revoke)
Bigger picture: robust auth is lifecycle management, not only login/logout.
Why in this project: session flow exists, but lifecycle policy needs to be explicit and consistent.
Related files: src/features/auth/login/index.tsx, src/utils/auth.ts, src/utils/logout.ts

7. Next.js middleware auth patterns
Bigger picture: middleware is the policy gateway for route-level access control.
Why in this project: many role branches and redirects must remain consistent and non-bypassable.
Related files: src/middleware.ts

8. Auth state architecture in React apps
Bigger picture: auth guard state must be deterministic through navigation and hydration.
Why in this project: route checks and render gating can lead to fragile UI flow.
Related files: src/app/AuthProvider.tsx, src/hooks/auth.ts

9. Separation of concerns in API clients
Bigger picture: networking code should fetch data, not control UI navigation and notifications.
Why in this project: API layer handles toasts and redirects, increasing coupling.
Related files: src/utils/api.ts

10. TypeScript strict mode mindset
Bigger picture: strict typing reduces hidden runtime errors and improves refactor safety.
Why in this project: wide usage of any weakens compile-time guarantees.
Related files: src/utils/api.ts, src/features/superuser/music-request/services/music-request.ts

11. Modeling API contracts with DTOs
Bigger picture: DTOs define stable request/response contracts between frontend and backend.
Why in this project: service payloads are frequently open-ended and can drift over time.
Related files: src/features/user/song-request/services/song-request.ts, src/features/superuser/music-request/services/music-request.ts

12. Generic API function design
Bigger picture: a typed generic request helper enables reuse without losing type safety.
Why in this project: central request utility exists and is ideal for stronger typing upgrades.
Related files: src/utils/api.ts

13. Runtime validation for untrusted data
Bigger picture: TypeScript checks compile-time assumptions, not runtime payload truth.
Why in this project: nested response access assumes shape correctness from server responses.
Related files: src/features/auth/login/index.tsx, src/features/superuser/music-request/components/withDj/index.tsx

14. Error taxonomy and handling strategy
Bigger picture: consistent error categories improve UX and observability.
Why in this project: endpoint-level error extraction patterns are inconsistent.
Related files: src/features/auth/login/index.tsx, src/utils/api.ts

15. React effects mental model
Bigger picture: useEffect should synchronize external effects, not encode hidden control flow.
Why in this project: auth and theme behavior depend on effects with mutable dependencies.
Related files: src/app/AuthProvider.tsx, src/components/theme/ModeChanger.tsx

16. Exhaustive dependencies done correctly
Bigger picture: correct dependencies prevent stale closures and state bugs.
Why in this project: several exhaustive-deps suppressions suggest design debt.
Related files: src/@core/hooks/useLayoutInit.ts, src/components/theme/ModeChanger.tsx, src/@menu/components/vertical-menu/VerticalNav.tsx

17. Cleanup patterns in effects
Bigger picture: async and timer side effects need cleanup to avoid unmounted updates.
Why in this project: timer-driven updates appear without explicit teardown.
Related files: src/@menu/components/vertical-menu/VerticalNav.tsx

18. Refs and DOM typing in TypeScript
Bigger picture: precise ref typing avoids null and unsafe DOM access issues.
Why in this project: DOM interactions currently rely on broad types and suppression.
Related files: src/components/layout/horizontal/VerticalNavContent.tsx

19. Browser API typing extensions
Bigger picture: non-standard browser APIs should be typed using declaration extension.
Why in this project: PWA detection uses a non-standard navigator property.
Related files: src/hooks/pwa.ts

20. React list reconciliation and keys
Bigger picture: stable keys ensure predictable render identity and state retention.
Why in this project: list mapping pattern can place key at non-top mapped node.
Related files: src/features/superuser/music-request/components/withDj/index.tsx, src/features/superuser/music-request/components/djApproved/index.tsx

21. Guarded rendering state machines
Bigger picture: explicit states avoid ambiguous and blank guard behavior.
Why in this project: route protection uses boolean gating that benefits from state modeling.
Related files: src/app/AuthProvider.tsx

22. Consistent logout/session invalidation
Bigger picture: one canonical logout path reduces drift and session edge-case bugs.
Why in this project: logout/session clearing behavior is split across utilities.
Related files: src/utils/auth.ts, src/utils/logout.ts, src/utils/api.ts

23. Code hygiene and dead code policy
Bigger picture: commented legacy blocks lower readability and increase maintenance cost.
Why in this project: large commented sections exist in core auth/middleware utilities.
Related files: src/utils/api.ts, src/middleware.ts

24. Lint strategy for long-term quality
Bigger picture: lint rules are process guardrails for team-wide consistency.
Why in this project: repeated lint suppressions indicate recurring anti-pattern pressure.
Related files: src/@menu/components/vertical-menu/VerticalNav.tsx, src/components/theme/ModeChanger.tsx, src/@core/hooks/useLayoutInit.ts

25. Testing auth and routing behavior
Bigger picture: access control should be validated as behavior across role scenarios.
Why in this project: redirect logic is multi-branch and easy to regress.
Related files: src/middleware.ts, src/features/auth/login/index.tsx

26. Security regression checklist before release
Bigger picture: release security quality improves when checks are repeatable and explicit.
Why in this project: auth and API layers are active and high-risk change surfaces.
Related files: LEARNING_ROADMAP.md

## Week 1: Security Foundation (Auth + Trust Boundaries)

### Day 1
- Study: topic 1 and topic 2.
- Output:
  - Draw your current auth flow.
  - List trusted and untrusted inputs.
- Workspace anchors:
  - src/features/auth/login/index.tsx
  - src/utils/auth.ts

### Day 2
- Study: topic 3 and topic 4.
- Output:
  - Explain why localStorage token strategy is risky under XSS.
  - Explain how CSRF appears in cookie-based auth.
- Workspace anchors:
  - src/utils/api.ts
  - src/utils/logout.ts

### Day 3
- Study: topic 5 and topic 6.
- Output:
  - Write your target token lifecycle for this project (short access token, refresh strategy, logout behavior).
- Workspace anchors:
  - src/middleware.ts
  - src/hooks/auth.ts

### Day 4
- Study: topic 7 and topic 8.
- Output:
  - Route protection matrix for guest/user/admin/dj/superuser.
- Workspace anchors:
  - src/middleware.ts
  - src/app/AuthProvider.tsx

### Day 5
- Apply learning in design doc only (no code required yet):
  - Current-state problems
  - Target-state architecture
  - Migration steps
- Deliverable:
  - docs/auth-architecture-notes.md (create this yourself when ready)

## Week 2: Type Safety + API Contracts

### Day 1
- Study: topic 9 and topic 10.
- Output:
  - Write clear responsibilities for API transport layer vs UI layer.

### Day 2
- Study: topic 11.
- Output:
  - Define DTOs for 3 endpoints you use most.
- Workspace anchors:
  - src/features/superuser/music-request/services/music-request.ts
  - src/features/user/song-request/services/song-request.ts

### Day 3
- Study: topic 12.
- Output:
  - Draft a typed generic request function signature.
- Workspace anchors:
  - src/utils/api.ts

### Day 4
- Study: topic 13 and topic 14.
- Output:
  - Define an error model for API failures: network, auth, validation, unknown.

### Day 5
- Practice checklist:
  - No new explicit any in service and utils files.
  - No blind casting for API responses.
  - Error handling maps to clear user-safe messages.

## Week 3: React Correctness + Reliability

### Day 1
- Study: topic 15.
- Output:
  - Explain stale closure with one example from your project.

### Day 2
- Study: topic 16.
- Output:
  - For each exhaustive-deps disable, explain root cause and safer pattern.
- Workspace anchors:
  - src/@core/hooks/useLayoutInit.ts
  - src/components/theme/ModeChanger.tsx
  - src/@menu/components/vertical-menu/VerticalNav.tsx

### Day 3
- Study: topic 17 and topic 18.
- Output:
  - Timer/listener cleanup checklist.
  - Ref typing checklist.
- Workspace anchors:
  - src/@menu/components/vertical-menu/VerticalNav.tsx
  - src/components/layout/horizontal/VerticalNavContent.tsx

### Day 4
- Study: topic 19 and topic 20.
- Output:
  - Replace ts-ignore strategy with proper type augmentation strategy (design note first).
  - React key placement rule summary.
- Workspace anchors:
  - src/hooks/pwa.ts
  - src/features/superuser/music-request/components/withDj/index.tsx

### Day 5
- Study: topic 21.
- Output:
  - Define explicit guard states: loading, allowed, redirecting, denied.
- Workspace anchors:
  - src/app/AuthProvider.tsx

## Week 4: Maintainability + Testing + Release Discipline

### Day 1
- Study: topic 22 and topic 23.
- Output:
  - One source of truth plan for logout/session invalidation.
  - Dead-code cleanup policy.

### Day 2
- Study: topic 24.
- Output:
  - Lint baseline policy:
    - no explicit any in key layers
    - no ts-ignore without documented reason
    - no react-hooks dependency suppression without review

### Day 3
- Study: topic 25.
- Output:
  - Route behavior test scenarios for each role.
- Workspace anchor:
  - src/middleware.ts

### Day 4
- Study: topic 26.
- Output:
  - Security pre-merge checklist for auth/token/role/route protections.

### Day 5
- Final weekly review:
  - What changed in your understanding?
  - What patterns will be your permanent standard?
  - What is still risky and needs follow-up?

## Quick Self-Review Checklist (Before Every PR)

- Auth and role checks are server-authoritative.
- No new token logic in localStorage unless explicitly justified.
- API layer does not navigate routes or trigger UI toasts directly.
- No new explicit any in core service/util paths.
- No new ts-ignore unless documented and reviewed.
- Effects have correct dependencies and cleanup.
- Mapped lists use stable keys at the top mapped element.
- Route guard behavior is deterministic and testable.

## Success Criteria

1. You can explain your auth model clearly in 2 minutes.
2. New service code is mostly fully typed end-to-end.
3. New effects rarely need lint suppression.
4. You can predict and test route behavior for every role.
5. Security checklist is run before each release.
