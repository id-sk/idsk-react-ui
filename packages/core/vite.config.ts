/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
  const isVanilla = mode === 'vanilla';

  return {
    plugins: [
      react(),
      tailwindcss(),
      !isVanilla && cssInjectedByJsPlugin(),
      !isVanilla &&
        dts({
          tsconfigPath: './tsconfig.json',
          entryRoot: 'src',
          exclude: [
            '**/*.test.tsx',
            '**/*.test.ts',
            '**/*.stories.tsx',
            '**/playwright/**',
          ],
        }),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
    },
    build: {
      emptyOutDir: !isVanilla,
      lib: {
        entry: isVanilla
          ? path.resolve(__dirname, 'src/vanilla.ts')
          : path.resolve(__dirname, 'src/index.ts'),
        name: 'IDSKCore',
        fileName: (format) => {
          if (isVanilla) {
            if (format === 'umd') return 'vanilla.js';
            return `vanilla.${format}.js`;
          }
          return `index.${format}.js`;
        },
        formats: ['es', 'umd'],
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) return 'style.css';
            return assetInfo.name || '';
          },
        },
      },
    },
  };
});