import mongoose from "mongoose";

export const dbConection = async () => {
  const remote = (process.env.MONGO_DB_DEV_LOCAL ||
    process.env.MONGO_DB_DEV_PROD) as string;

  const db = await mongoose.connect(remote);
  return db;
};
