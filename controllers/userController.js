import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const users = {
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const getUserById = await User.findById(id);

      res.status(200).json(getUserById);
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const getUser = await User.find().select("-password").lean();

      if (!getUser?.length) {
        res.status(400).json({ error: "Nenhum usuário encontrado" });
      }

      res.status(200).json(getUser);
    } catch (error) {
      console.log("Erro na requisição do usuário", error);
    }
  },
  create: async (req, res) => {
    try {
      const { username, password, name, email, department } = req.body;

      // validação
      if (password.length < 8) {
        res
          .status(400)
          .json({ error: "A senha precisa ter no mínimo 8 caracteres" });
      }

      const existUser = await User.findOne({ username });
      if (existUser) {
        res.status(400).json({ error: "A conta com esse username já existe!" });
      }

      // password hash
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const response = await User.create({
        username,
        name,
        email,
        password: passwordHash,
        department,
      });
      res.status(201).json({ response, msg: "Usuário criado com sucesso!" });
    } catch (error) {
      console.log({ error: error });
    }
  }
};
