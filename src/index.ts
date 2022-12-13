import express from "express"
import { ApppDataSource } from "./data-source"
import routes from "./routes";
const swaggerUi =  require("swagger-ui-express")
const swaggerDocs = require("./swagger.json")

ApppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json())
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    
    app.use(routes)

    return app.listen(3000)
})