# Code Style Rules

## TypeScript / Next.js
- Read node_modules/next/dist/docs/ before writing any Next.js code (breaking changes in v16)
- Use strict TypeScript. No `any`. No type assertions without a comment explaining why.
- Prefer named exports over default exports.
- No barrel files (index.ts re-exports) unless the directory has 5+ exports.

## Structure
- Co-locate tests next to source files: `foo.ts` -> `foo.test.ts`
- Keep functions under 40 lines. Extract when they grow.
- No premature abstraction. Three similar lines of code > one fragile abstraction.
- No backwards-compat shims, renamed unused _vars, or removed-code comments.

## What NOT to add without being asked
- No docstrings or JSDoc on code you didn't change
- No error handling for scenarios that can't happen
- No feature flags or backwards-compat shims
- No helpers for one-time operations
