import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: './schema.prisma',
  migrate: {
    async resolveConnectionString() {
      return process.env.DATABASE_URL ?? '';
    },
  },
});
