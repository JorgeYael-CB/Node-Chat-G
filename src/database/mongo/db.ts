import mongoose from 'mongoose';


export class MongoDb {

  constructor(
    private readonly mongoUri: string,
  ){}


  async connect(){
    try {
      await mongoose.connect(this.mongoUri);
      console.log('Mongo Db connected!');
    } catch (error) {
      console.log('Mongo DB error');
      console.log(error)
    }
  }


}