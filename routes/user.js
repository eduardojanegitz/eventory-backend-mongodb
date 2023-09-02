import express from "express";
import { users } from "../controllers/userController.js";

const router = express.Router();

router.route("/user").get((req, res) => users.getAll(req, res));
// USUÁRIO SETADO PARA APARECER O NOME
// router.route("/user/:id").get((req, res) => users.getById(req, res));

// criação de usuário
router.route("/user").post((req, res) => users.create(req, res));

//login route
router.post("/user/login", users.loginUser);

export default router;
