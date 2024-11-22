import {Hono} from "hono";

const apiRoutes = new Hono()
  .get('/ping', c => c.text('Pong!'));

export {apiRoutes};
export type ApiRouteType = typeof apiRoutes;