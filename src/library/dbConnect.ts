import mongoose from "mongoose";



type ConnectionObject = {
    isConnected?: number,
}
const connection:ConnectionObject ={}

async function dbConnect():Promise<void> {
    if (connection.isConnected) {
        console.log('db is already connected');
        return 
    }

   try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '');
  connection.isConnected =  db.connections[0].readyState
    console.log('db connect successfully');
    
   } catch (error:any) {
    console.log('db connection failed  error ', error.message);
    process.exit(1)
   }


}

export default dbConnect