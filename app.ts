import { Application } from "@/deps.ts";
import { router } from "@/router/router.ts";
import "https://deno.land/x/dotenv@v3.1.0/load.ts";

const app = new Application();

// Logger
app
  .use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  })
  // Timing
  .use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  })
  .use(router.routes())
  .use(router.allowedMethods());

app.addEventListener("listen", (e) => {
  console.log(`listening on http://localhost:${e.port}/`);
});

app.listen({ port: parseInt(Deno.env.get("PORT") || "3000") });
