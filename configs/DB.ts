import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("# Connect to db successfully ...");
  } catch (error) {
    throw error;
  }
})();
