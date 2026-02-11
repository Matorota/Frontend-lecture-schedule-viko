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

1. Register with your student information and select your group
2. Login to access your schedule
3. View lectures by day, week, or month
4. Filter by different student groups

## Build

For production, update `src/config.ts` to use the actual API URL instead of the proxy.

To build:

```bash
npm run build
```

The build output will be in the `dist` folder.
