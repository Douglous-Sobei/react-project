const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./errorHandler");

const app = express();

app.use(cors());

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Define Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Node Js API Project for mongodb",
      version: "1.0.0",
      description: "API Documentation of my Application Endpoints",
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
    components: {
      schemas: {
        Book: {
          type: "object",
          properties: {
            _id: { type: "string" },
            id: { type: "integer" },
            title: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to database");
});

// Use the routes defined in routes.js
app.use("/", require("./routes"));

// Use the error handler
app.use(errorHandler);

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
