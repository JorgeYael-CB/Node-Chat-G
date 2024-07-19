

export class ValidateData {

  static email( email: string ): [string?, string?]{
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/;
    if( !email ) return ['Missing email'];
    if( typeof email !== 'string' || !regex.test(email) ) return ['Email is not valid!'];

    return [, email.toLowerCase().trim()];
  }

  static password( password: string ):[string?, string?]{
    if( !password ) return ['Missing password'];
    if( typeof password !== 'string' ) return [''];
    if( !isNaN(+password) ) return ['the password must have letters.'];
    if( password.trim().length < 5 ) return ['Passowrd is too short.'];
    if( password.trim().length > 100 ) return ['Passowrd is too long.'];

    return [, password]
  }

  static userName( name: string ): [string?, string?]{
    if( !name ) return ['Missing name.'];
    if( typeof name !== 'string' ) return ['name is not valid'];
    if( name.trim().length < 3 ) return ['name is too short.'];
    if( name.trim().length > 140 ) return ['name is too length'];

    return [, name.trim()];
  }

}