import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { notFound, forbidden, catchAllErrorHandler } from "./errorHandlers.js";

import authorsRouter from "./authors/index.js";
import blogsRouter from "./blogs/index.js";


//import path to public folder
import path, { dirname } from "path";
import { fileURLToPath } from "url";
//importpath  to public folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDirectory = path.join(__dirname, "../public");


///running a server
const server = express();
const port = process.env.PORT //env variables from .env

//taking the variables for front from env file
const whiteList = [process.env.FE_DEV_URL, process.env.FE_PROD_URL] 

// white list
const corsFunc = {
  origin: function(origin, next ){console.log("CURRENT ORIGIN: ", origin)
  if (!origin || whitelist.indexOf(origin) !== -1) { // we allow the objects from whitelist 
       next(null, true)
  } else {// if we dont have object in the whitelist it will reject the request
    
    next(new Error(`Origin ${origin} not allowed!`))
  }

  }
}
server.use(cors(corsFunc)); //use white list in the cors




server.use(express.json());
server.use(express.static(publicDirectory));   //to use a path do public directory
server.use("/authors", authorsRouter);
server.use("/blogs", blogsRouter);
server.use(notFound);
server.use(forbidden);
server.use(catchAllErrorHandler);

//console.log(listEndpoints(server));

server.listen(port, () => console.log("Server is running on port : ", port));

server.on("error", (error) =>
  console.log(` Server stopped : ${error}`)
);
