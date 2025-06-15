import express from "express";
import authRouter from "./authentication.route";
// import refreshRouter from "./refreshToken.route";


const rootRouter = express.Router();


//authentication routes
rootRouter.use('/auth',authRouter);

//metrics routes
// rootRouter.use(metricsRouter)




export default rootRouter;