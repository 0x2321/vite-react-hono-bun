// @ts-ignore
import {Hono} from "hono";
import {serveStatic} from 'hono/bun';
import {secureHeaders} from 'hono/secure-headers';
import {csrf} from 'hono/csrf';
import {apiRoutes} from "./api";

const server = new Hono();

/**
 * MIDDLEWARES
 * This section defines the middleware functions that will be applied to incoming requests.
 */
server.use(secureHeaders());      // uses default security headers (https://hono.dev/docs/middleware/builtin/secure-headers)
server.use(csrf());               // uses default CSRF protection (https://hono.dev/docs/middleware/builtin/csrf)

/**
 * API ROUTES
 * This section imports the API endpoints that are declared in ./src/api/index.ts
 */
server.route('/api', apiRoutes);
server.use('/api/*', async c => c.text('Not found.', 404)); // fallback option

/**
 * STATIC FILES / PUBLIC FILES
 * This section defines the routes that serve the vite build.
 */
server.get('/*', serveStatic({
  root: './static',
  onFound: (path, c) => {
    // set cache header for build assets
    if (path.startsWith('./static/_app/')) {
      c.header('Cache-Control', 'public, max-age=604800, immutable')
    }
  }
}));
server.get('/*', serveStatic({path: import.meta.env.PROD ? './static/index.html' : './index.html'})); // just a react router path

export default server;