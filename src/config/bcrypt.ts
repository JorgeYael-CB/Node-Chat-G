import { compareSync, hashSync } from 'bcryptjs';



export class BcryptAdapter {

  constructor(){}

  comapre( password: string, passwordHash: string ){
    return compareSync(password, passwordHash);
  }

  hash(password: string){
    return hashSync(password);
  }

}
