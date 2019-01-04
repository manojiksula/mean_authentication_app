import express from "express";
import { createServer } from "http";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import passport from "passport";

//Import Passport
import passportAuthenticate from "../api/config/passport";

const app = express();
const server = createServer(app);

//Setup Http-Logger Middleware
app.use(logger('dev'));

//Handling CORS Errors Middleware
app.use(cors());

//Import Routes
import userRoute from "../api/routes/user";
import dashboardRoute from "../api/routes/dashboard";

//Import DataBase Connection
import "../api/config/database";

//Setup Static Folder
app.use(express.static(path.resolve(__dirname, '../public')));

//Setup Body-Parser & Cookie-Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

//Setup Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

//Import Passport
passportAuthenticate(passport);

//Route for Users
app.use('/user', userRoute);

//Route for DashBoard
app.use('/user', dashboardRoute);

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`server running on port ${port}!!`));