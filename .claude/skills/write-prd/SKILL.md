---
name: write-prd
description: Converts the understanding from grill-me into a durable, structured PRD formatted as a GitHub issue. This is the blueprint the agent team uses as memory. Run after /project:grill-me.
trigger: /project:write-prd
---

# Write a PRD

Convert the grill-me session into a durable spec. This is what the agent team
reads — not the conversation, the destination.

## Output Format (GitHub Issue Shape)

```markdown
## Feature: [Name]

### Problem Statement
[1-2 sentences: what user pain does this solve?]

### Definition of Done
- [ ] Specific, testable criterion 1
- [ ] Specific, testable criterion 2
- [ ] Specific, testable criterion 3

### User Stories
- As a [role], I want [action] so that [outcome]

### Functional Requirements
1. [Exact behavior the system must exhibit]
2. ...

### Non-Functional Requirements
- Performance: [specific threshold if any]
- Security: [specific auth/data requirements]
- Scale: [expected load]

### Out of Scope
- [What this feature explicitly does NOT do]

### Edge Cases
- [Edge case] -> [expected behavior]

### Tech Stack Context
- Framework: Next.js 16 (see AGENTS.md — breaking changes apply)
- [Other relevant stack details TBD when project is defined]

### Open Questions
- [Anything still unresolved that blocks implementation]
```

## Rules
- Every definition-of-done item must be testable by the tester agent
- No vague requirements ("should be fast" -> "p95 response time <200ms")
- Out of scope section is mandatory — it prevents scope creep during implementation
- Open questions must be resolved before handing to /project:prd-to-issues
