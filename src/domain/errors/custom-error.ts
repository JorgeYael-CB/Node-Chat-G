
export class CustomError extends Error {

  constructor(
    public readonly error: string,
    public readonly status: number,
  ){
    super(error);
  }


  static BadRequestException( error: string ){
    return new CustomError(error, 401);
  }

  static InternalServerError( error?: string, details?: any ){
    // Manejamos los errores no controlados
    console.log(error);

    return new CustomError('An unexpected error has occurred, please try again later.', 500);
  }

}
