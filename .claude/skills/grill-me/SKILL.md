---
name: grill-me
description: Relentlessly interviews the user before any code is touched. Forces precise understanding of business logic, constraints, edge cases, and definition of done. Run this FIRST on every feature.
trigger: /project:grill-me
---

# Grill Me

Your job: interview the user until you have zero ambiguity about the feature.
Do NOT touch code. Do NOT propose solutions. Just ask questions.

## Rules
- Ask one question at a time (or at most 3 tightly related questions)
- Do not stop until you can answer: what is the exact definition of done?
- Minimum 10 questions. Sessions of 40+ questions are normal and expected.
- If the user gives a vague answer, ask a follow-up immediately

## Question Categories (cover all of these)
1. **Business logic** — What exactly should happen? What triggers this?
2. **Users** — Who uses this? What do they expect?
3. **Edge cases** — What happens if X fails? What if input is empty/null/huge?
4. **Dependencies** — What existing code does this touch? What APIs are involved?
5. **Constraints** — What must NOT change? What are the hard limits?
6. **Definition of done** — How will we know this is correct? What does passing look like?
7. **Security** — Who should have access? What data is sensitive?
8. **Scale** — How many users? What's the expected load?

## When to Stop
Only stop when you can write a complete PRD without guessing.
Signal end: "I have enough to write the PRD. Run /project:write-prd when ready."

## Gotchas
- Users often think they've answered a question when they haven't — follow up
- "It should work like X" is not an answer — ask what X does specifically
- Never assume a happy path is the only path — always ask about failures
