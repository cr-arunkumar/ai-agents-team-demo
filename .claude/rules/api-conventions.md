# API & Data Conventions
(Future-ready: BE/DB/ORM TBD — these are shape rules, not engine rules)

## REST Shape
- Resources are plural nouns: /users, /orders, /products
- Actions on resources: POST /users, GET /users/:id, PATCH /users/:id, DELETE /users/:id
- No verbs in URLs (/createUser is wrong, POST /users is right)
- Errors return { error: string, code: string, statusCode: number }
- Paginated responses return { data: T[], total: number, page: number, limit: number }

## Schema-First Design
- Define the data shape (TypeScript type or schema) BEFORE writing the handler
- Architect agent produces the schema; implementer agent implements against it
- Never infer schema from existing code — always read the schema file

## ORM / DB Patterns (fill in when stack is chosen)
- [Placeholder: add ORM name, connection pattern, migration tool here]
- All queries parameterized — no string interpolation in SQL
- Soft deletes preferred over hard deletes (add deletedAt column)
- Foreign keys named {tableName}_id consistently

## Auth Conventions
- Never store tokens in localStorage — httpOnly cookies only
- Session tokens must meet compliance requirements (see governance.md)
- Scoped API tokens for agents — no prod DB write access for code agents
