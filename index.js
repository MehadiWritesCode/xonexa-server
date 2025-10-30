import dotenv from "dotenv"
dotenv.config();

import express from "express";
const app = express();

import cors from 'cors'
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
// app.use(cors());

const allowedOrigins = [
    'https://xonexa-server.onrender.com',
    'https://xonexa-client.vercel.app',  
    'http://localhost:5173',                    
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true 
}));


app.use(express.urlencoded({extended:true}))
app.use(express.json());

const PORT = process.env.PORT || 3000

//app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use(`/api/products`,productRoutes)
app.use(`/api/users`,userRoutes)

//Home route
app.get("/",(req,res) =>{
    res.redirect("/");
})

// Catch all other routes
app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});


// Start the server
app.listen(PORT, () => {
console.log(`Server is running at http://localhost:${PORT}`);
});
