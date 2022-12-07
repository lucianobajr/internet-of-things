import { Redis } from "@upstash/redis";
import { Router } from "worktop";
import { listen } from "worktop/cache";

const routes = new Router();

declare global {
  var UPSTASH_REDIS_REST_URL: string;
  var UPSTASH_REDIS_REST_TOKEN: string;
}

const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
});

routes.add("GET", "/get", async (req, res) => {
  const my_replenisher = await redis.hget("value", "my_replenisher");
  return res.send(200, { my_replenisher });
});

routes.add("PUT", "/change-value", async (req, res) => {
  const body = await req.body.json();

  await redis.hset("value", {
    ["my_replenisher"]: body.value,
  });

  return res.send(201, { ok: "the value has changed!" });
});

listen(routes.run);
