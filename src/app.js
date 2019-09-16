import "dotenv/config";
import express from "express";
import path from "path";
import mongoose from "mongoose";

import logger from "./middleware/logger";

const app = express();

// mongoDB connection
mongoose.connect(
  process.env.MDB_CONNECTION,
  {
    useNewUrlParser: true,
    useFindAndModify: false
  },
  () => console.log("Connected to MongoDB Atlas")
);

// Initialize custom middleware
app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static folder
app.use(express.static("public"));

// Serve simple html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Members api routes
app.use("/api/members", require("./routes/api/members"));

// Authentication routes
app.use("/auth", require("./routes/auth/auth"));

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
