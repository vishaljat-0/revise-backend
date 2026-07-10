const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
  } catch (error) {
  console.error(error);
  console.error("name:", error.name);
  console.error("code:", error.code);
  console.error("cause:", error.cause);
}
};

module.exports = { connectdb };