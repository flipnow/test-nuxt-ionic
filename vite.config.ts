import { fileURLToPath, URL } from 'url';
import { loadEnv, UserConfig, defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { visualizer } from 'rollup-plugin-visualizer';
// import aspectRatioPlugin from 'postcss-aspect-ratio-polyfill';
// import { parse } from 'postcss-scss';

export const config: UserConfig = {
  plugins: [vue(), svgLoader(), visualizer()],
  build: {
    target: 'es2015',
    cssTarget: 'safari13',
    rollupOptions: {
      treeshake: 'recommended',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/assets/stylesheets/responsive.scss';`,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
};

interface Config {
  mode: string;
}

export default ({ mode }: Config) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    ...config,
    server: {
      https: env.VITE_USE_HTTPS === 'true',
    },
  });
};
