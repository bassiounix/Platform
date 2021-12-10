import { Router } from "@/deps.ts";
import { Users } from "@/database/db.ts";

export const router = new Router();
let i = 0;

router.get("/", async (ctx) => {
  await Users.create({
    email: "john.doe" + i + "@mail.com",
    password: "john.doe" + i,
  });
  i++;
  ctx.response.body = await Users.all();
});
