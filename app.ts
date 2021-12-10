import { Application } from "@/deps.ts";
import { router } from "@/router/router.ts";

const app = new Application();

app.addEventListener("listen", (e) => {
  console.log(`listening on http://localhost:${e.port}/`);
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen({ port: parseInt(Deno.env.get("PORT") as string) || 3000 });
