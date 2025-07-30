import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import cors from "cors";
import linkRoutes from "./routes/linkRoute.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/api-specs.json" assert { type: "json" };

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rute API
app.use("/api/users", userRoutes);
app.use("/api/link", linkRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (_req, res) => {
  res.send("Welcome to the CCTV NOC API!");
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send("Penulisan Salah!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ready on http://localhost:${PORT}`));
