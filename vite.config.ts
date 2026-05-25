import solid from 'vite-plugin-solid';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
  plugins: [solid({ hot: mode !== 'test' })],
  test: {
    environment: 'node',
  },
}));
