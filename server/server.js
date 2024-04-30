const express = require("express");
const app = express();
const cors = require("cors");
const user = require("./Router/user");
const manager = require(`./Router/manager`);
const report = require(`./Router/report`);
const vote = require(`./Router/vote`);
const community = require(`./Router/community`);
const profile = require("./Router/profile");

app.use(
  cors({
    origin: "http://localhost:3000", // Your Next.js frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", user, manager, profile);
//app.use("/api/manager", manager);
app.use("/api/auth/profile", profile);
app.use(`/api/report`, report);
app.use(`/api/community`, community, vote);
//app.use("/api/vote", vote);

app.listen(5000, () => {
  console.log("app is listining in 5000 ");
});
