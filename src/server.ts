import { createApp } from './app';
import { env } from './config/env';
import { seedIfEmpty } from './prisma/seed';

async function startServer(): Promise<void> {
  try {
    // Seed database if empty
    await seedIfEmpty();

    // Create and configure Express app
    const app = createApp();

    // Start server
    const port = parseInt(env.PORT, 10);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
