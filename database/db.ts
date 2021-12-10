import { Database, MySQLConnector } from "@/deps.ts";
import { Users } from "./Models/users.model.ts";

const connection = new MySQLConnector({
  host: Deno.env.get("HOST") || "localhost",
  username: Deno.env.get("USERNAME") || "user",
  password: Deno.env.get("PASSWORD") || "user",
  database: "platform",
});

export const db = new Database(connection);

db.link([Users]);
db.sync({ drop: true });

export { Users };
