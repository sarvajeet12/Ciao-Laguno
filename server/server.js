require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/dbConfig");
const cloudinaryConnect = require("./configs/cloudinaryConfig");
const fileUpload = require("express-fileupload");



const app = express();
const port = process.env.PORT;



// cloudinary connect
cloudinaryConnect()


// TODO: tackle cors

const corsOption = {
    // origin: "http://localhost:3000",
    origin: "https://ciao-laguno-1-client.onrender.com",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
};

// file upload
const fileUploadOption = {
    useTempFiles: true,
    tempFileDir: "/tmp",
}

// middleware
app.use(express.json());
app.use(cors(corsOption))
app.use(fileUpload(fileUploadOption))





// ? Router Path
const userRouter = require("./routers/userRouters");
const certificateRouter = require("./routers/certificateRouters");
const certificateIdRouter = require("./routers/certificateIdRouters")


// TODO: routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/certificate", certificateRouter);
app.use("/api/v1/generate", certificateIdRouter);





// If database connected successfully THEN run "app.listen"
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port no: ${port}`);
    });
});