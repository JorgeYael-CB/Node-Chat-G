import { roles } from "../types";



export class UserEntity {

  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly img: string,
    public readonly roles: roles[],
    public readonly id: string | number,
    public readonly active: boolean,
    public readonly country: string,
  ){}

}
