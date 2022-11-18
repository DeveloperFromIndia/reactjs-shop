import {} from "dotenv/config";
import {} from "./models/models.js";
import cors from "cors";
import express from "express";
import sequelize from "./db.js";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).json({message:"work"})
})

const start = async () => {
    try {
        await sequelize.authenticate(); // Connection to db 
        await sequelize.sync({alter:true}); // Reconciliation with the data schema
        app.listen(PORT, () => { console.log(`<Server started on port ${PORT}/>`); })
    } catch (e) {   
        console.error(e)
    }
}

start();