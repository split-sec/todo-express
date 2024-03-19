import express from "express";
import { createUser, doesUserAlreadyExist, signinController } from "../controllers/auth.js";
import { generateJWT } from "../utils/index.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { body } = req;

  const userAlreadyExists = await doesUserAlreadyExist(body.email_id)
  
  if (userAlreadyExists) {
    res.status(409).send({
      error: "There is already a user with the same email-id"
    });
  } else {
    const JWT = await createUser(body);

    res.status(200).send({
      message: "User created successfully",
      token: JWT,
    });
  }
});

authRouter.post("/signin", async (req, res) => {
  const { body } = req;

  const { arePasswordsMatching, id } = await signinController(body);

  if (arePasswordsMatching) {
    const JWT = await generateJWT(id);
    res.status(200).send({
      message: "Sign in successful",
      token: JWT
    });
  }

  else {
    res.status(401).send({
      message: "Wrong email-id or password"
    })
  }
})

export default authRouter;