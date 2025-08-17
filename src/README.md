# Layered Architecture Structure

This project follows a layered architecture pattern to separate concerns and improve maintainability.

## Directory Structure

```
src/
├── presentation/        # React components, hooks (UI layer)
│    ├── components/     # Reusable UI components
│    ├── pages/         # Page-level components
│    └── hooks/         # React hooks for UI logic
├── application/         # State management, services, use cases
│    ├── store/         # State management (Context, Redux, etc.)
│    ├── useCases/      # Business use cases and workflows
│    └── validators/    # Input validation logic
├── domain/              # Business logic & entities (pure TS/JS)
│    ├── models/        # Type definitions and interfaces
│    ├── valueObjects/  # Utility functions and pure logic
│    └── services/      # Domain services and data
├── infrastructure/      # API clients, persistence, external libs
│    ├── api/           # API clients and external services
│    └── adapters/      # Third-party library adapters
├── shared/             # Shared utilities and test helpers
│    └── test-utils/    # Testing utilities and mocks
└── index.tsx           # Main entry point
```

## Layer Responsibilities

### Presentation Layer

- **Components**: React components for UI rendering
- **Pages**: Page-level components that compose other components
- **Hooks**: React hooks for UI-specific logic (theme, analytics, accessibility)

### Application Layer

- **Store**: State management using React Context
- **Use Cases**: Business workflows and application logic
- **Validators**: Input validation and business rules

### Domain Layer

- **Models**: TypeScript interfaces and type definitions
- **Value Objects**: Pure utility functions (date utils, animations, etc.)
- **Services**: Domain services and data management

### Infrastructure Layer

- **API**: External API clients and data fetching
- **Adapters**: Third-party library integrations (Firebase, etc.)

### Shared

- **Test Utils**: Common testing utilities and mocks

## Import Guidelines

- Presentation layer can import from Application, Domain, and Infrastructure
- Application layer can import from Domain and Infrastructure
- Domain layer should not import from other layers (pure business logic)
- Infrastructure layer can import from Domain
- Shared utilities can be imported by any layer

## Benefits

1. **Separation of Concerns**: Each layer has a specific responsibility
2. **Testability**: Pure domain logic is easier to test
3. **Maintainability**: Changes in one layer don't affect others
4. **Scalability**: Easy to add new features without breaking existing code
5. **Team Collaboration**: Different teams can work on different layers
