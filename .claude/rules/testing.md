# Testing Rules

## TDD Mandate
Always use /project:tdd. The sequence is non-negotiable:
1. Write failing test (Red)
2. Write minimum code to pass (Green)
3. Refactor with tests still green (Refactor)

## Coverage Gates
- Line coverage: > 80% (enforced by tester agent)
- Duplication: < 3%
- No PR merges if coverage drops below threshold

## What to Test
- Test behavior, not implementation
- Integration tests must hit real services (no mocking DB or external APIs at integration level)
- Unit tests: mock at system boundaries only (HTTP calls, file I/O)
- Every agent-written function needs at minimum one happy path + one failure path test

## Regression Suite
- Tester agent runs full regression after every implementer PR
- Any test flakiness -> task created to fix before next sprint
