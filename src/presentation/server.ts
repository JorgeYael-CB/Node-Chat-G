import express, { Router } from 'express';
import cors from 'cors';



export class Server{

  private readonly app = express();


  constructor(
    private readonly port: number,
    private readonly routes: Router,
  ){}


  config(){
    // Middlewares
    this.app.use( express.json() )
    this.app.use( express.urlencoded( {extended: true } ))

    // Cors
    this.app.use( cors() );

    // Routes
    this.app.use( 'api/', this.routes );
  }


  start(){
    this.app.listen( this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    })
  }

}
