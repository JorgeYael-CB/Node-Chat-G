import { v4 as uuid } from 'uuid';


export class UuidAdpater {

  constructor(){}


  public get id():string {
    return uuid();
  }

}
