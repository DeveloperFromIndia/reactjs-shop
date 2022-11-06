import express from 'express';

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
    console.log(`<Server started on port ${PORT}/>`);
})

app.get("/api", (req, res) => {
    res.json({
        message:"Now there's nothing here"
    })
})