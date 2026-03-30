---
name: prd-to-issues
description: Breaks a PRD into vertical tracer bullet slices — ordered to flush unknown unknowns first. Each slice is a self-contained GitHub issue the agent team can claim. Run after /project:write-prd.
trigger: /project:prd-to-issues
---

# PRD to Issues

Break the PRD into vertical slices. Flush unknown unknowns first.
Each issue must be implementable by one agent in one session.

## Slicing Rules
1. **Vertical, not horizontal** — each slice goes through all layers (UI + API + DB) for one small behavior
2. **Tracer bullets first** — the first 1-2 issues should be the thinnest possible end-to-end proof of concept
3. **Unknown unknowns** — any unclear area of the PRD becomes a spike issue first
4. **No issue should take more than 2 hours** for an implementer agent
5. **Each issue is self-contained** — it can be reviewed and merged independently

## Output Format (one block per issue)

```markdown
### Issue: [Number] — [Title]

**Type**: spike | feature | test | chore
**Depends on**: #[issue number] or "none"
**Files likely affected**: [file1, file2, file3]

**Description**:
[What needs to be built, in plain English]

**Acceptance Criteria**:
- [ ] Testable criterion 1
- [ ] Testable criterion 2

**Agent Assignment**: planner -> architect -> implementer -> tester -> reviewer
```

## Ordering Logic
1. Spike issues (unknowns to resolve)
2. Tracer bullet (thinnest end-to-end slice)
3. Feature slices (incrementally add behavior)
4. Polish / edge case issues
5. Performance / scale issues (last)

## Gotchas
- If you're not sure how to slice, ask: "what is the smallest thing that could work?"
- Never combine DB schema + UI in one issue — schema changes need architect sign-off separately
- Test issues are not separate — every feature issue includes its own tests
