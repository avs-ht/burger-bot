import "./app/commands";
import { server } from "./app/connections/server.connection";
server.listen(3000, () => console.log("Server started on port 3000"));
import "./app/routes/book";
