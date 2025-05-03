# Cursor AI Guide for Next.js 15 Turbo Monorepo

This guide will help you effectively use Cursor AI when working with this Next.js 15 Turbo Monorepo project.

## Getting Started with Cursor AI

1. **Install Cursor**: Download and install Cursor IDE from [cursor.sh](https://cursor.sh)
2. **Open Project**: Open this project folder in Cursor
3. **Enable AI**: Ensure you're logged in and AI features are enabled

## Using Project-Specific Rules

This project includes custom rules that help Cursor AI understand our conventions and architecture. These rules are located in `.cursor/rules/` and cover various aspects of our development patterns.

To leverage these rules effectively:

### 1. Reference Rules Explicitly

When asking Cursor AI for help, reference specific rule sets:

```
// Good - References specific patterns
"Create a new user profile component following our component-patterns"

// Better - Provides additional context
"Following our component-patterns, create a new user profile component that
displays the user's avatar, name, and bio, with proper dark mode support"
```

### 2. Use Clear, Specific Instructions

Be specific about your requirements and which part of the codebase you're working with:

```
// Vague
"Help me with the auth logic"

// Specific
"Help me implement clerk authentication in the sign-up form component located
in apps/web/app/(unauthenticated)/sign-up/page.tsx, following our auth patterns"
```

### 3. Request Complete Solutions

Cursor AI can generate complete solutions that follow project conventions:

```
"Create a server action for creating a new blog post with validation, error
handling, and database operations following our server-actions patterns"
```

### 4. Iterate and Refine

If the AI's initial response doesn't fully meet your needs, refine your request:

```
"That looks good, but can you update it to also handle image uploads using
our storage package and add proper error handling?"
```

## Common Tasks with Examples

### Creating New Components

```
"Create a dashboard-stats component that shows total users, active users,
and revenue metrics following our component-patterns with responsive layout"
```

### Implementing Server Actions

```
"Create a server action to update user profile information following our
server-actions patterns, including validation with Zod and optimistic updates"
```

### Working with Database Models

```
"Help me extend the user model in the Prisma schema to include subscription
information following our database-patterns"
```

### Styling Components

```
"Add responsive styles to this pricing table component following our
styling-guidelines with dark mode support"
```

### Writing Tests

```
"Write comprehensive tests for this authentication component following
our testing-practices, including cases for valid login, invalid credentials,
and network errors"
```

## Tips for Better Results

1. **Be Specific**: Provide clear context and requirements
2. **Reference Files**: Mention specific files you're working with
3. **Mention Packages**: Specify which packages should be used
4. **Include Test Requirements**: Mention testing needs upfront
5. **State Performance Concerns**: Mention if performance is critical
6. **Specify Edge Cases**: List edge cases that should be handled
7. **Link Related Code**: Reference similar components or features

## Troubleshooting

If Cursor AI generates code that doesn't match project conventions:

1. Check that you referenced the appropriate rule pattern
2. Be more explicit about which conventions to follow
3. Show an example from the codebase that follows the desired pattern
4. Break down complex requests into smaller, more manageable tasks

## Updating Rules

As our project evolves, we may need to update the AI rules. If you notice patterns that should be reflected in our rules:

1. Discuss with the team
2. Update the relevant rule file in `.cursor/rules/`
3. Document the change in the project's development log

---

Remember that Cursor AI is a tool to assist development, not replace careful thinking and code review. Always review AI-generated code for quality, security, and adherence to our standards.
