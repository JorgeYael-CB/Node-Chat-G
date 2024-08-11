import { Server } from "http";
import { WebSocket, WebSocketServer } from 'ws';
import { WsType } from "../domain/types";



interface Options{
  server:Server;
  path?: string; // ws
}

export class WssService {

  private static _instance: WssService;
  private wss: WebSocketServer;


  private constructor({ server, path = '/ws' }: Options)
  {
    this.wss = new WebSocketServer({
      server,
      path,
    });

    this.start();
  }


  static get instance(): WssService{
    if( !WssService._instance ){
      throw 'WssService is not initialized';
    }

    return WssService._instance;
  };


  static initWss( options: Options )
  {
    WssService._instance = new WssService(options);
  }


  public onSendMessage( type: WsType, payload: Object )
  {
    this.wss.clients.forEach( cliente => {
      if( cliente.readyState === WebSocket.OPEN )
      {
        const data = JSON.stringify( {type, payload} );
        cliente.send(data);
      }
    })
  }


  public start()
  {
    this.wss.on('connection', (socket: WebSocket) => {
      console.log('Cliente conectado!');

      socket.on('close', () => {
        console.log('Cliente desconectado.');
      })
    })
  }


}
