import jwt from 'jsonwebtoken';



export class JwtAdapter {

  constructor(
    private readonly seed: string,
  ){}


  create( payload: any ): Promise<string | undefined>{
    return new Promise( resolve => {
      jwt.sign(payload, this.seed, {expiresIn: '1d'}, function(error, encoded){
        if( !encoded ){
          resolve(undefined);
        };

        resolve(encoded)
      });
    })
  }

  compare(){
  }

}
