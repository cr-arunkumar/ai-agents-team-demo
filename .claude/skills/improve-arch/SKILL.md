---
name: improve-arch
description: Weekly codebase architecture improvement. Deepens shallow modules, eliminates workslop, improves codebase quality so future agent output improves. Run weekly or before starting a new feature area.
trigger: /project:improve-arch
---

# Improve Codebase Architecture

Run weekly. Better codebase = better agent output.

## Step 1: Read the Codebase
- Read all files in app/ and any lib/ or utils/ directories
- Identify: shallow modules, premature abstractions, dead code, oversized functions

## Step 2: Produce Architecture Report

```markdown
## Architecture Report — [date]

### Shallow Modules (need deepening)
- [file]: [what it does superficially vs what it should own]

### Oversized Functions (>40 lines)
- [file:line]: [function name] — [X lines] — suggested split

### Premature Abstractions (used once)
- [file]: [abstraction] — used only in [file2] — inline it

### Dead Code
- [file]: [thing] — no references found

### Duplication
- [file1] and [file2] share [pattern] — extract to [suggested location]

### Dependency Concerns
- [anything that creates unexpected coupling]
```

## Step 3: Prioritize
Score each issue: Impact (1-3) x Effort (1-3). Fix highest impact/lowest effort first.

## Step 4: Fix (one issue at a time)
For each fix:
1. Run /project:tdd on any code being changed
2. Confirm tests still green after fix
3. Update architecture report with what was done

## Rules
- Never refactor and add features in the same commit
- Never improve architecture in the same PR as a feature
- Each fix is a separate, reviewable commit
- If a fix requires changing >5 files, create an issue instead of doing it in-session

## Gotchas
- "Shallow module" = a file that just re-exports or delegates without adding value
- Improving arch weekly means each improvement is small — don't batch months of debt
- The goal is: when an agent reads this codebase next session, it gets better output
