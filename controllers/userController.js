import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const getUserById = await User.findById(id);

    res.status(200).json(getUserById);
  } catch (error) {
    console.log(error);
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const getUser = await User.find().select("-password").lean();

    if (!getUser?.length) {
      res.status(400).json({ error: "Nenhum usuário encontrado" });
    }

    res.status(200).json(getUser);
  } catch (error) {
    console.log("Erro na requisição do usuário", error);
  }
};
export const createUser = async (req, res) => {
  try {
    const { username, password, name, email, department, roles, active } =
      req.body;

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
      roles,
      active,
    });
    res.status(201).json({ response, msg: "Usuário criado com sucesso!" });
  } catch (error) {
    console.log({ error: error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, name, email, password, department, roles, active } =
      req.body;

    const { id } = req.params;
    const user = await User.findById(id).exec();
    if (!user) {
      res.status(204).json({ msg: `Nenhum usuário encontrado com esse ID!` });
    }

    let updatedPasswordHash = user.password;
    if (password) {
      const salt = await bcrypt.genSalt();
      updatedPasswordHash = await bcrypt.hash(password, salt);
    }
    const response = await user.updateOne({
      username,
      name,
      email,
      password: updatedPasswordHash,
      department,
      roles,
      active,
    });
    res.status(201).json({ response, msg: "Usuário atualizado com sucesso!" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).exec();
    if (!user) {
      res.status(204).json({ msg: `Nenhum usuário encontrado!` });
    }
    const response = await user.deleteOne();
    res.status(200).json({ response, msg: "Usuário excluído com sucesso!" });
  } catch (error) {
    console.log(error);
  }
};
