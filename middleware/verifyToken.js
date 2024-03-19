import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const { headers } = req;

  const token = headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401).send({
      message: "Unauthorized login"
    })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({
      message: "Invalid JWT Token"
    })
    
    req.userID = user.userID

    next();
  })
}

export default verifyToken;