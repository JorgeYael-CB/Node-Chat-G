import { createServer } from "http";
import { envs, WssService } from "./config";
import { MongoDb } from "./database/mongo";
import { Routes } from "./presentation/routes";
import { Server } from "./presentation/server";


(() => {
  main();
})();



async function main() {
  // Conectar DB
  const mongoDb = new MongoDb(envs.MONGO_DB_URI);
  await mongoDb.connect();


  // Servidor
  const server = new Server(
    envs.port,
    Routes.router
  );


  // websockets
  const httpServer = createServer( server.app );
  WssService.initWss({
    server: httpServer,
  });

  server.setRoutes(); // iniciamos las rutas

  // Sockets
  httpServer.listen(envs.port, () => {
    console.log(`Server running on port: ${envs.port}`);
  })
}
