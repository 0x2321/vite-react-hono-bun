import {Hono} from "hono";

const pingRoutes = new Hono()
  .get('/', c => c.text('Pong!'));

export {pingRoutes};