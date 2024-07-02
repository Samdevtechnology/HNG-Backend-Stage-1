import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import hello from "./routes/hello.js";

const port = process.env.PORT || 5000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/hello", hello);

app.get("/", (req, res) => {
  res.render("index");
});

app.all("*", (req, res) => {
  res.status(404);
  res.render("404");
});

app.listen(port, () => console.log(`server is up and running on port ${port}`));
