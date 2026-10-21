import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
import path, { dirname } from 'path';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    {
      name: getAbsolutePath('@storybook/addon-docs'),
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    getAbsolutePath('@whitespace/storybook-addon-html'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  viteFinal: async (config) => {
    // Dynamically import tailwindcss as it is likely ESM
    const { default: tailwindcss } = await import('@tailwindcss/vite');

    // Ensure Tailwind v4 runs inside Storybook (Vite builder)
    config.plugins = config.plugins || [];

    // Check if plugin is already added to avoid duplicates
    const hasTailwind = (config.plugins ?? [])
      .flat(5)
      .some(
        (p) =>
          p &&
          typeof p === 'object' &&
          'name' in p &&
          typeof p.name === 'string' &&
          p.name.startsWith('@tailwindcss/vite'),
      );
    if (!hasTailwind) {
      config.plugins = [tailwindcss(), ...config.plugins];
    }

    // Allow importing files from the monorepo
    config.server = config.server || {};
    config.server.fs = config.server.fs || {};
    config.server.fs.allow = Array.from(
      new Set([
        ...(config.server.fs.allow || []),
        // monorepo root
        path.resolve(import.meta.dirname, '../../..'),
        // packages folder
        path.resolve(import.meta.dirname, '../../'),
      ]),
    );

    // Ensure Vite resolves @id-sk/react to source during development
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@id-sk/react/vanilla': path.resolve(import.meta.dirname, '../../core/src/vanilla.ts'),
      '@id-sk/react': path.resolve(import.meta.dirname, '../../core/src/index.ts'),
      '@idsk/css': path.resolve(import.meta.dirname, '../../core/src/style/global.css'),
    };

    if (config.build) {
      config.build.sourcemap = false;
    }

    config.optimizeDeps = {
      ...config.optimizeDeps,
      exclude: [...(config.optimizeDeps?.exclude ?? []), 'prettier'],
    };

    return config;
  },
};
export default config;

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
