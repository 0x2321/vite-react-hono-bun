// @ts-ignore
import React from "react";
import {Hono} from "hono";
import {serveStatic} from 'hono/bun';
import {secureHeaders} from 'hono/secure-headers';
import {csrf} from 'hono/csrf';
import {renderToString} from "react-dom/server";
import {apiRoutes} from "./api";

const html = renderToString(
  <html>
  <head>
    <meta charSet="utf-8"/>
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
  </head>

  <body>
  <div id="root"></div>
  {import.meta.env.NODE_ENV === 'production' ? (
    <script type="module" src="/static/client.js"></script>
  ) : (
    <script type="module" src="/src/client.tsx"></script>
  )}
  </body>
  </html>
);

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
 * STATIC FILES
 * This section defines the routes that serve the vite build.
 */
server.use('/static/*', serveStatic({root: './'}));
server.get('/static/*', c => c.text('Not found.', 404)); // fallback option

/**
 * PUBLIC FILES
 * This section defines the routes that serve public files directly from the /public directory.
 * If a file is requested that does not exist in the /public folder, the default HTML file will be served.
 */
server.use('/*', serveStatic({root: './public', rewriteRequestPath: p => p.replace(/^\/public/, '')})); // serve public files
server.get("/*", c => c.html(html)); // serve default index.html, if there is noting in the public folder

export default server;