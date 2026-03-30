---
name: tdd
description: Enforces Red -> Green -> Refactor on every implementation task. Auto-invoked by the implementer agent. The most consistent way to improve agent code quality.
trigger: /project:tdd
---

# TDD Skill

## The Sequence (non-negotiable)

### Step 1: Red
Write a failing test BEFORE writing any implementation code.
- Test must fail for the right reason (not a syntax error — a missing behavior)
- Run: `bun test [file]` and confirm it fails

### Step 2: Green
Write the MINIMUM code to make the test pass.
- Do not write more than the test requires
- Run: `bun test [file]` and confirm it passes
- If it passes without changes, your test was wrong — go back to Red

### Step 3: Refactor
Clean up the code while keeping tests green.
- Extract duplication
- Improve naming
- Run: `bun test [file]` after every refactor step

## Coverage Check
After each Green step, check coverage:
```bash
bun test --coverage [file]
```
Coverage on new code must exceed 80% before moving to next task.

## Test Structure
```typescript
describe('[Unit under test]', () => {
  it('should [behavior] when [condition]', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

## Gotchas
- Never skip Red. A test that was never failing proves nothing.
- Never refactor in the Green step — keep the steps separate
- If you can't write a test first, the requirements are not clear enough — go back to /project:grill-me
- Integration tests: no mocking at the DB or HTTP boundary — use real services

## When Done with a Task
- [ ] All tests green
- [ ] Coverage >80% on changed files
- [ ] No TODOs without issue numbers
- [ ] Signal tester agent to run regression suite
