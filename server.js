const mongoose = require("mongoose");

const app = require("./app");

const { BD_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(BD_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error.message));
