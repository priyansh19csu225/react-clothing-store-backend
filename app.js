const express = require("express");
const app = express(); // express function and it return an app fn
// it create a new app for our application
// app.use(middleware); // middleware it is a fn
const cors = require("cors");
app.use(express.static("public")); // I am Using a Middleware
require("dotenv").config();
app.use(express.json()); // {key:value}
app.use(express.urlencoded()); // key=value&key=value
const { ROOT } = require("./utils/config").ROUTES;
app.use(cors());
app.use(ROOT, require("./api/routes/user"));
app.use(ROOT, require("./api/routes/product"));
app.use(ROOT, require("./api/routes/cart"));
app.use(ROOT, require("./api/routes/payment"));
app.use(ROOT, require("./api/routes/order"));
app.use(require("./utils/middlewares/404"));

const server = app.listen(process.env.PORT || 1234, (err) => {
  if (err) {
    console.log("App Crash ", err);
  } else {
    console.log("Server Started... ", server.address().port);
  }
});
