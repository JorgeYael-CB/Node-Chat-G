import { envs } from "./config";
import { Routes } from "./presentation/routes";
import { Server } from "./presentation/server";


(() => {
  main();
})();

function main() {
  // Conectar DB


  // Servidor
  const server = new Server(
    envs.port,
    Routes.router
  );

  server.start();


  // Sockets
}
