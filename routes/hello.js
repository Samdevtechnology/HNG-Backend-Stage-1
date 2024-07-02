import express from "express";
import { getHello } from "../controllers/hello.js";

const route = express.Router();

route.get("/", getHello);

export default route;
