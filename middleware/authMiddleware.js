import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json("O usuário não tem autorização para esta rota!");
    }
    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      res.status(401).json("errinnho");
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      res.status(401).json("erro");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        res.status(401).json(error);
      }
      req.username = decoded.UserInfo.username;
      req.roles = decoded.UserInfo.roles;
      return next();
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
