import "dotenv/config.js";


if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
}

if(!process.env.JWT_KEY){
    throw new Error("JWT_KEY is not defined");
}

if(!process.env.GOOGLE_CLIENT_ID){
    throw new Error("GOOGLE_CLIENT_ID is not defined");
}

if(!process.env.GOOGLE_CLIENT_SECRET){
    throw new Error("GOOGLE_CLIENT_SECRET is not defined");
}

const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_KEY:process.env.JWT_KEY,
  GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET
};

export default config;
