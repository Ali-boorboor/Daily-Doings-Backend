import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const swaggerConfigs = (app: any) => {
  const swaggerDocument = swaggerJsDoc({
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "Daily Doings APIs 📊",
        description: "Daily Doings project API documentation.",
        version: "1.0.0",
      },
    },
    apis: ["./modules/**/*.ts"],
  });

  const swagger = swaggerUi.setup(swaggerDocument);
  app.use("/api-docs", swaggerUi.serve, swagger);
};

export default swaggerConfigs;
