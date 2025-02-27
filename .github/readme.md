project-root/
├── .github/ # GitHub workflows và configuration
│ └── workflows/
│ ├── ci.yml # CI pipeline
│ └── deployment.yml # CD pipeline
├── .husky/ # Git hooks cho linting, formatting trước commit
├── .vscode/ # VS Code configuration
├── public/ # Static assets
│ ├── favicon.ico
│ ├── images/
│ └── locales/ # i18n translation files
├── src/
│ ├── app/ # App Router
│ │ ├── (auth)/ # Grouped routes cho authentication
│ │ │ ├── login/
│ │ │ │ ├── page.tsx # Login page
│ │ │ │ └── actions.ts # Server actions cho login
│ │ │ ├── register/
│ │ │ │ └── page.tsx
│ │ │ └── layout.tsx # Layout chung cho auth pages
│ │ ├── (dashboard)/ # Grouped routes cho dashboard
│ │ │ ├── dashboard/
│ │ │ │ ├── page.tsx # Dashboard page
│ │ │ │ ├── loading.tsx # Loading UI
│ │ │ │ └── error.tsx # Error boundary
│ │ │ ├── settings/
│ │ │ │ └── page.tsx
│ │ │ ├── @modal/ # Parallel route cho modals
│ │ │ │ └── default.tsx
│ │ │ └── layout.tsx # Dashboard layout
│ │ ├── api/ # API Routes
│ │ │ ├── auth/
│ │ │ │ └── [...nextauth]/
│ │ │ │ └── route.ts
│ │ │ └── webhooks/
│ │ │ └── stripe/
│ │ │ └── route.ts
│ │ ├── globals.css # Global styles
│ │ ├── layout.tsx # Root layout
│ │ ├── page.tsx # Home page
│ │ ├── error.tsx # Global error boundary
│ │ └── not-found.tsx # 404 page
│ ├── components/ # Shared components
│ │ ├── ui/ # UI components (low level)
│ │ │ ├── button.tsx
│ │ │ ├── input.tsx
│ │ │ ├── dialog.tsx
│ │ │ └── ...
│ │ ├── common/ # Common components (mid level)
│ │ │ ├── header/
│ │ │ │ ├── index.tsx
│ │ │ │ └── user-menu.tsx
│ │ │ ├── footer/
│ │ │ └── sidebar/
│ │ └── features/ # Feature-specific components
│ │ ├── auth/
│ │ │ ├── login-form.tsx
│ │ │ └── register-form.tsx
│ │ └── dashboard/
│ │ ├── stats-card.tsx
│ │ └── activity-feed.tsx
│ ├── config/ # App configuration
│ │ ├── site.ts # Site metadata
│ │ ├── dashboard.ts # Dashboard config
│ │ └── nav.ts # Navigation config
│ ├── hooks/ # Custom hooks
│ │ ├── use-debounce.ts
│ │ ├── use-media-query.ts
│ │ └── use-local-storage.ts
│ ├── lib/ # Library code and utilities
│ │ ├── auth.ts # Authentication utilities
│ │ ├── db/ # Database related
│ │ │ ├── schema.ts # DB schema (Prisma/Drizzle)
│ │ │ └── index.ts # DB client
│ │ ├── utils/ # General utilities
│ │ └── api/ # API client utilities
│ ├── store/ # State management
│ │ ├── slices/ # Redux/Zustand slices
│ │ └── index.ts # Store configuration
│ ├── styles/ # CSS modules, component styles
│ ├── types/ # TypeScript type definitions
│ │ ├── index.ts # Common types
│ │ ├── api.ts # API related types
│ │ └── auth.ts # Auth related types
│ ├── middleware.ts # Next.js middleware
│ └── constants/ # App constants
├── prisma/ # Prisma ORM (nếu sử dụng)
│ └── schema.prisma # Database schema
├── .env # Environment variables
├── .env.example # Example environment variables
├── .eslintrc.js # ESLint configuration
├── .gitignore # Git ignore
├── .prettierrc # Prettier configuration
├── jest.config.js # Jest configuration
├── next.config.js # Next.js configuration
├── package.json # Dependencies
├── postcss.config.js # PostCSS configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json # TypeScript configuration
