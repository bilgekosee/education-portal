const express = require("express");
const pageRoute = require("./routes/pageRoute");

const app = express();

//template engine
app.set("view engine", "ejs");

//middlewears
app.use(express.static("public"));

app.use("/", pageRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`port ${port} portunda başlatıldı`);
});
