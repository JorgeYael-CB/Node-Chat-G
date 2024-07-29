import express, { Router } from 'express';
import cors from 'cors';



export class Server{

  public readonly app = express();


  constructor(
    private readonly port: number,
    private readonly routes: Router,
  ){
    this.config();
  }


  private config(){
    // Middlewares
    this.app.use( express.json() )
    this.app.use( express.urlencoded( {extended: true } ))

    // Cors
    this.app.use( cors() );
  }

  public setRoutes(){
    // Routes
    this.app.use( '/api', this.routes );
  }


  start(){
    this.app.listen( this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    })
  }

}
