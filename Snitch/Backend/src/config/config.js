import "dotenv/config.js";


if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
}

if(!process.env.JWT_KEY){
    throw new Error("JWT_KEY is not defined");
}

const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_KEY:process.env.JWT_KEY
};

export default config;
