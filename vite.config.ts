/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Vite plugin to handle API requests securely on the server side
function secureApiPlugin() {
  return {
    name: 'secure-api-routes',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        // Set JSON response headers
        res.setHeader('Content-Type', 'application/json');
        
        try {
          // Import API handler dynamically
          const { handleApiRequest } = await server.ssrLoadModule('/src/api/server.ts');
          await handleApiRequest(req, res);
        } catch (err: any) {
          console.error('[API Server Error]:', err);
          res.statusCode = 500;
          res.end(JSON.stringify({
            error: 'Internal Server Error',
            message: err?.message || 'An unexpected error occurred on the server.'
          }));
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), '');
  
  // Set GEMINI_API_KEY in process.env for Node server environment
  if (env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
  }

  return {
    plugins: [react(), secureApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
    },
    server: {
      port: 3000,
    }
  };
});
