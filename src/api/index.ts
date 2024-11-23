import {Hono} from "hono";
import {pingRoutes} from "@/api/pong.ts";

const apiRoutes = new Hono()
  .route('/ping', pingRoutes);

export {apiRoutes};
export type ApiRouteType = typeof apiRoutes;