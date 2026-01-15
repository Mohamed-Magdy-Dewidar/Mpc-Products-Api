import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT || '3000',
  DATABASE_URL: process.env.DATABASE_URL || '',
  // Default to localhost, but allow override in .env
  BASE_URL: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
};

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}