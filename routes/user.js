import express from "express";
import { users } from "../controllers/userController.js";
import jwt from "jsonwebtoken";
// import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

// router.use(verifyJWT)

router.get("/user", users.getAll);
// USUÁRIO SETADO PARA APARECER O NOME
// router.route("/user/:id").get((req, res) => users.getById(req, res));

// criação de usuário
router.post("/user", users.create);

//login route



export default router;
