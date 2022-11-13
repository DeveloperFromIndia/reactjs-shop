import {} from "dotenv/config";
import express from "express";

import sequelize  from "./db.js";


const PORT = process.env.PORT || 3001;


const app = express();

const start = async () => {
    try {
        await sequelize.authenticate(); // Connection to db 
        await sequelize.sync(); // Reconciliation with the data schema
        app.listen(PORT, () => { console.log(`<Server started on port ${PORT}/>`); })
    } catch (e) {   
        console.log(e)
    }
}

start();