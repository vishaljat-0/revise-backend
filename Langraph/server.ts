import config from "./src/config/config.js";
import app from "./src/app";
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
