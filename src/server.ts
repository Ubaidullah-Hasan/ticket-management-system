import app from "./app";
import mongoose from "mongoose";
import { Server } from "http";
import config from "./app/config";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("MongoDB Connect");

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// Handling Unhandled Promise Rejections => normally outside of express app
process.on("unhandledRejection", () => {
  console.log("Unhandled rejection is detected, Sutting down...");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("UncaughtException rejection is detected, Sutting down...");
  process.exit(1);
});
