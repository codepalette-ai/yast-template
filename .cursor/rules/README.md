# Cursor Rules for Next.js 15 Turbo Monorepo

This directory contains detailed rules and guidelines for Cursor AI to follow when working with this Next.js 15 Turbo Monorepo project.

## Available Rules

| Rule File                | Description                                                |
| ------------------------ | ---------------------------------------------------------- |
| `tech-stack.mdc`         | Core architecture, file structure, and technology overview |
| `component-patterns.mdc` | Guidelines for creating and structuring components         |
| `server-actions.mdc`     | Patterns for implementing Next.js Server Actions           |
| `testing-practices.mdc`  | Best practices for testing components and server code      |
| `database-patterns.mdc`  | Prisma database usage and optimization patterns            |
| `styling-guidelines.mdc` | Tailwind and shadcn UI styling conventions                 |

## How Cursor Uses These Rules

These rules are loaded into Cursor's AI context when working on the project. The AI will reference these rules to provide more relevant and project-specific assistance.

Rules help the AI:

- Follow consistent code patterns
- Understand the project architecture
- Generate code that matches project conventions
- Provide better suggestions and completions

## Usage Guidelines

- Refer to specific rules when asking Cursor for help
- Use rule names in your requests (e.g., "Please follow the component-patterns for this")
- Update rules as project conventions evolve

## Examples

1. **Creating a new component:**
   "Create a new dashboard component following our component-patterns"

2. **Implementing a server action:**
   "Implement a server action to create a new user following our server-actions patterns"

3. **Styling a component:**
   "Style this dropdown following our styling-guidelines with dark mode support"

4. **Writing tests:**
   "Write tests for this component following our testing-practices"

5. **Database operations:**
   "Create a function to fetch paginated users using our database-patterns"

## Maintenance

These rules should be updated as the project evolves. Key times to update:

- After adding new design patterns
- When adopting new packages or tools
- When refining architectural decisions
- When identifying better practices

Remember, these rules are meant to be living documentation that evolves with the project.
