import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error.message);
    process.exitCode = 1;
  }
};

startServer();
