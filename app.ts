import { Application } from "@/deps.ts";
import { router } from "@/router/router.ts";
import "https://deno.land/x/dotenv@v3.1.0/load.ts";

const app = new Application();

app.addEventListener("listen", (e) => {
  console.log(`listening on http://localhost:${e.port}/`);
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen({ port: parseInt(Deno.env.get("PORT") || "3000") });
