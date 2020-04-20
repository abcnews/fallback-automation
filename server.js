const express = require("express");
const handler = require("./api/_lib/handler");
const isDev = process.env.NODE_ENV === "development";
const app = express();
const port = 3000;

app.use("/", handler);
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
