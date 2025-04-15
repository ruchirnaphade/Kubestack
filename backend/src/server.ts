import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { employeeRouter } from "./employee.routes";
import client from "prom-client"; // 👈 NEW

dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  console.error("No ATLAS_URI environment variable has been defined in config.env");
  process.exit(1);
}

// 👇 Prometheus setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // This will collect CPU, memory, etc.

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

// 👇 Wrap the server in a function to attach metrics outside DB connection
function startServer() {
  const app = express();
  app.use(cors());

  // 👇 Middleware to count all requests
  app.use((req, res, next) => {
    res.on("finish", () => {
      httpRequestCounter.labels(req.method, req.path, res.statusCode.toString()).inc();
    });
    next();
  });

  app.use("/employees", employeeRouter);

  // 👇 Prometheus metrics endpoint
  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  });

  app.listen(5200, () => {
    console.log(`Server running at http://localhost:5200...`);
  });
}

connectToDatabase(ATLAS_URI)
  .then(startServer)
  .catch((error) => console.error(error));
