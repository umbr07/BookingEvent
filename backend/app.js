const express = require('express')
const router = require('./routers/router')

const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(4000, () => {
  console.log("Server running at port 4000");
});