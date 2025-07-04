# Contributing to AssistPro

Thank you for considering contributing to AssistPro! This document provides guidelines for contributing to the project.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How to Contribute

### Reporting Issues

1. **Check existing issues** first to avoid duplicates
2. **Use the issue template** when creating new issues
3. **Provide detailed information** including:
   - Operating system and version
   - Node.js version
   - Browser version (if applicable)
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)

### Submitting Pull Requests

1. **Fork the repository**
2. **Create a feature branch** from `main`
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Follow coding standards**
5. **Test your changes**
6. **Commit with clear messages**
   ```bash
   git commit -m "Add amazing feature"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Create a Pull Request**

### Development Setup

```bash
# Clone the repository
git clone https://github.com/[your-username]/assist3.git
cd assist3

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Coding Standards

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow ESLint configuration
- **Prettier**: Format code with Prettier
- **Naming**: Use descriptive variable and function names
- **Comments**: Write clear comments for complex logic
- **Testing**: Write tests for new features

### Commit Messages

Follow the conventional commits format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for code style changes
- `refactor:` for code refactoring
- `test:` for testing changes
- `chore:` for maintenance tasks

### Project Structure

```
assist3/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom hooks
│   │   └── lib/          # Utilities
├── server/                # Express backend
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   └── utils/           # Server utilities
├── shared/               # Shared types and schemas
└── docs/                # Documentation
```

### Testing

- Run tests: `npm test`
- Run specific test: `npm test -- filename`
- Coverage: `npm run test:coverage`

### Building

- Development: `npm run dev`
- Production build: `npm run build`
- Type checking: `npm run check`

## Questions?

Feel free to ask questions by:
- Creating an issue
- Emailing: dev@assistpro.com
- Joining our Discord: [Link]

## Recognition

Contributors will be recognized in:
- README.md contributors section
- CHANGELOG.md for significant contributions
- GitHub contributors page

Thank you for contributing! 🎉
