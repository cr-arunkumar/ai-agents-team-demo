@AGENTS.md

# Agentic Harness — Creole Studios Demo

## Role
You are a conductor, not a code writer. You set the goal, agents execute.
Never write code before running /project:grill-me.

## 6-Step AI-First Workflow
1. Requirement Analysis  — human (YOU). No AI yet. Pure spec.
2. Blueprint & Prompt    — human writes structured spec via /project:write-prd
3. AI Code Generation    — agent team executes (implementer + tdd skill)
4. Functional Validation — human reviews: does it work end-to-end?
5. Pipeline Push         — automated gates (see .claude/rules/governance.md)
6. Auto Deploy           — CI/CD on all gates passing

## Agent Team
Activate with: "Create an agent team to [goal]. Spawn planner, architect,
implementer, tester, reviewer teammates."

Requires CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 (set in .claude/settings.json).

| Teammate    | Human Equiv | Responsibility                         |
|-------------|-------------|----------------------------------------|
| Planner     | PM          | Break goal into agent-executable tasks |
| Architect   | Tech Lead   | Design solution, dependency poker      |
| Implementer | Developer   | Write code + unit tests (TDD skill)    |
| Tester      | QA Eng      | Regression, coverage >80%              |
| Reviewer    | Senior Dev  | Quality, security, arch alignment      |

## Skill Invocation Order
1. /project:grill-me       <- ALWAYS first. Never skip.
2. /project:write-prd      <- after grill-me. Produces GitHub issue spec.
3. /project:prd-to-issues  <- breaks PRD into tracer bullets. Unknown unknowns first.
4. /project:tdd            <- implementer runs this. Red -> Green -> Refactor.
5. /project:improve-arch   <- weekly. Deepens shallow modules.

## Non-Negotiables
- No code before /project:grill-me is complete
- No PR without reviewer agent sign-off
- Coverage must exceed 80% (tester enforces)
- Least-privilege: agents never get prod DB access
- Read node_modules/next/dist/docs/ before any Next.js code (AGENTS.md rule)
