import { envs } from "./config";
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

  server.start();


  // Sockets
}
