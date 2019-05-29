require("dotenv").config({ debug: true });
const app = require("./middleware");


// Port Listener
app.listen(process.env.PORT, () =>
  console.log(
    "Server running on PORT <======= " + process.env.PORT + " =======>"
  )
);
