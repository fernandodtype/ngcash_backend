import express from "express"
import { ApppDataSource } from "./data-source"
import routes from "./routes";

ApppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json())
    
    app.use(routes)

    return app.listen(3000)
})