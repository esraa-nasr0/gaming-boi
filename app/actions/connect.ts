import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

const connect = async (): Promise<typeof mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL environment variable is not defined");
    }

    cached.promise = mongoose.connect(mongoUrl, {
      dbName: "gamehub",
      bufferCommands: false
    })
    .then((mongooseInstance) => {
      console.log("Connected to MongoDB");
      return mongooseInstance;
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);
      cached.promise = null; // Reset promise on error
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connect;