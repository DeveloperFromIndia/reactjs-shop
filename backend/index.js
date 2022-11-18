import {} from "dotenv/config";
import {} from "./models/models.js";
import cors from "cors";
import express from "express";
import sequelize from "./db.js";
import errorHandler from "./middleware/errorHandlingMiddleware.js";
import router from "./routes/index.js";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate(); // Connection to db 
        await sequelize.sync(); // Reconciliation with the data schema
        app.listen(PORT, () => { console.log(`<Server started on port ${PORT}/>`); })
    } catch (e) {   
        console.error(e)
    }
}

start();