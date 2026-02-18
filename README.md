# VIKO Schedule

Lecture schedule management system for VIKO college students.



## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your actual Firebase credentials and API keys
```

3. Start development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Configuration

The API is accessed through a Vite proxy to avoid CORS issues. Configuration is in `vite.config.ts`:

```typescript
proxy: {
  '/api': {
    target: 'https://schedule.aripinet.space',
    changeOrigin: true,
  }
}
```

## Usage

1. **Select Language** - Choose between English and Lithuanian on the welcome page
2. **Register** - Create an account with your student information and select your group
3. **Login** - Access your personalized schedule
4. **View Schedule** - Browse lectures by day, week, or month
5. **Switch Groups** - Filter by different student groups if needed

## Language Support

The application supports:

- 🇬🇧 English (default)
- 🇱🇹 Lithuanian (Lietuvių kalba)

Language preference is saved automatically. See [LANGUAGE_SETUP.md](LANGUAGE_SETUP.md) for developer documentation.

## Environment Variables

See [ENV_SETUP.md](ENV_SETUP.md) for detailed information on setting up environment variables for Firebase and API configuration.

## Build

For production, update `src/config.ts` to use the actual API URL instead of the proxy.

To build:

```bash
npm run build
```

The build output will be in the `dist` folder.
