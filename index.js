import express from "express"
import dotenv from "dotenv"
import connectDb from "./configs/db.js"
import authRouter from "./routes/authRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import courseRouter from "./routes/courseRoute.js"
import paymentRouter from "./routes/paymentRoute.js"
import aiRouter from "./routes/aiRoute.js"
import reviewRouter from "./routes/reviewRoute.js"
import rateLimit from "express-rate-limit";
dotenv.config()

let port = process.env.PORT || 8000
let app = express()
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use("/api/auth", limiter, authRouter);
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/ai", aiRouter)
app.use("/api/review", reviewRouter)

app.get('/favicon.ico', (req, res) => res.status(204).send());







app.get("/" , (req,res)=>{
    res.send("Hello From Server")
})

const startServer = async () => {
  try {
    await connectDb();
    console.log("DB connected");

    app.listen(port, () => {
      console.log("Server Started");
    });

  } catch (error) {
    console.error("DB error:", error);
    process.exit(1);
  }
};

startServer();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});
