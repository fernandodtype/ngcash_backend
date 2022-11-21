import express from "express"
import { ApppDataSource } from "./data-source"

ApppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json())
    app.get("/", (req, res) => {
        return res.json({"data": "OK"})
    })

    return app.listen(3000)
})