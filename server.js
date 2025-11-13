import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Authroutes from "./src/Back_routes/authroutes.js";
import dotenv from "dotenv";

dotenv.config();

function connect_db() {
  const app = express(); // Express app create karte hain.
  const PORT = 5000; // Port set karte hain (default: 5000).

  // 2. Middleware Setup
  app.use(cors()); // React app ko is server se data lene ki permission deta hai.
  app.use(express.json()); // JSON data handle karne ke liye middleware.
  app.use("/api/auth", Authroutes);

  // 3. MongoDB Connection
  mongoose
    .connect(process.env.mongo_url)
    .then(async () => {
      // database name le rahe hai 
      const connection = mongoose.connection;
      const admin = connection.db.admin();
      const databases = await admin.listDatabases();
      const First_db = databases.databases[0];
      const dbname = First_db.name;
      console.log(`MongoDB Connected Successfully: ${dbname}`);
    }) // Agar connection successful hai toh ye message aayega.
    .catch((err) => console.error(err));

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
connect_db();
