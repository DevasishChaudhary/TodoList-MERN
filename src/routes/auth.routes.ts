import {Router} from "express"; //express router
import {signup, login} from "../controllers/auth.controller"; //controllers (we create next)

const router = Router(); //create a mini roueter

//map URLs to controller functions
router.post("/signup", signup); //POST /api/auth/signup
router.post("/logoin", login); //POST /api/auth/login

export default router;


