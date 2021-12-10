import { Application, send } from "@/deps.ts";
import { router } from "@/router/router.ts";
import "https://deno.land/x/dotenv@v3.1.0/load.ts";
import {
  bgRed,
  cyan,
  green,
  white,
  yellow,
} from "https://deno.land/std/fmt/colors.ts";

const app = new Application();

// Logger
app
  .use(async (ctx, next) => {
    await next();
    const responseTime = ctx.response.headers.get("X-Response-Time");
    console.log(
      `${green(ctx.request.method)} ${cyan(ctx.request.url.pathname)}`,
    );
    console.log(`${bgRed(white(String(responseTime)))}`);
  })
  // Timing
  .use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  })
  // Router middlewares
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx) => {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/static`,
    });
  })
  // Not Found 404
  .use((ctx) => {
    ctx.response.status = 404;
    ctx.response.body = {
      success: false,
      message: "404 - Not found.",
    };
  });

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}/`;
  console.log(
    `${yellow("Listening on:")} ${green(url)}`,
  );
});

app.addEventListener("error", (e) => {
  console.log(e);
});

app.listen({ port: parseInt(Deno.env.get("PORT") || "3000") });
