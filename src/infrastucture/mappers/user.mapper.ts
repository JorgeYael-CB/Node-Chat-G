import { UserEntity } from "../../domain/entities";

export class UserMapper {

  static getUserFromObject( user: {[key:string]: any} ):UserEntity{
    const { name, email, password, img, roles, _id, id, active, country } = user;

    return new UserEntity( name, email, password, img, roles, _id || id, active, country );
  }

}
