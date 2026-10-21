/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import * as path from 'path';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';

// Next.js App Router vyžaduje 'use client' ako úplne prvý riadok bundlu.
// Pridáva sa až po zápise súborov, aby ho nič (napr. vkladanie CSS) neodsunulo.
const useClientDirective = () => ({
  name: 'use-client-directive',
  closeBundle() {
    for (const file of ['dist/index.es.js', 'dist/index.umd.js']) {
      const filePath = path.resolve(__dirname, file);
      if (!existsSync(filePath)) continue;
      const code = readFileSync(filePath, 'utf8');
      if (!code.startsWith("'use client'")) {
        writeFileSync(filePath, `'use client';\n${code}`);
      }
    }
  },
});

export default defineConfig(({ mode }) => {
  const isVanilla = mode === 'vanilla';

  return {
    plugins: [
      react(),
      tailwindcss(),
      !isVanilla && cssInjectedByJsPlugin(),
      !isVanilla && useClientDirective(),
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