# AI Governance & Ironclad Pipeline

## The 3 Risks (Creole Studios Townhall 2026)
1. Hallucinations — AI generates code that looks correct but is subtly wrong
2. Data Leaks — agents with broad permissions expose sensitive data
3. Workslop — low-quality AI output that technically runs but is bloated/unmaintainable

## Ironclad Pipeline Gates (5 required before production)
| Gate | Tool (future)   | Criteria                                              |
|------|-----------------|-------------------------------------------------------|
| 1    | SonarQube       | Coverage >80%, duplication <3%, complexity check      |
| 2    | Snyk            | Vulnerability scan, secret detection, license check   |
| 3    | Jest / Bun test | AI-gen test cases, regression suite, coverage report  |
| 4    | AI reviewer bot | PR logic errors, arch alignment                       |
| 5    | CI/CD           | All pass -> deploy. Any fail -> reject, no exceptions |

## Least-Privilege Rules
- No agent gets prod DB write access
- Scoped API tokens per agent role
- Audit all agent data flows before shipping
- Reviewer agent must explicitly sign off before Gate 5

## Hallucination Prevention
- Reviewer agent in PR pipeline (mandatory, not optional)
- Human validates functional correctness at Step 4 of 6-step workflow
- Critical paths require human sign-off, not just AI reviewer

## Workslop Prevention
- Architecture review on all AI design decisions (architect agent)
- /project:improve-arch run weekly to deepen shallow modules
- No merges with TODO/FIXME left by agents without a linked issue
