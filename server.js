import express from "express";
import path from "path";
import hello from "./routes/hello.js";

const port = process.env.PORT || 5000;

const app = express();

//Routes
app.use("/api/hello", hello);

app.listen(port, () => console.log(`server is up and running on port ${port}`));
