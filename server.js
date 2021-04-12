const express = require("express");
const app = express();
const connectDB = require("./config/db");

const port = process.env.PORT || 5000;
connectDB();

app.use(express.json({ extended: false }));

app.use("/api/login", require("./routes/api/login"));

app.use("/api/menuItems", require("./routes/api/menuItems"));
app.use("/api/team", require("./routes/api/team"));
app.use("/api/event", require("./routes/api/event"));
app.use("/api/reservation", require("./routes/api/reservation"));

app.listen(port, () => {
  console.log("Server is listen on port: " + port);
});
