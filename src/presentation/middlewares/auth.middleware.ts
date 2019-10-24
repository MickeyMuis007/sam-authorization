import colors from "color";
import jwt from "jsonwebtoken";

import { IUserAuthToken } from "../../application/model/auth/user-auth-token.model";
import { User } from "../../domain/aggregates/user/user.root-entity";

async function authCheck(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Access denied. No token provided");
  }

  try {
    const userAuthToken: IUserAuthToken = jwt.verify(token, "mike") as IUserAuthToken;

    const searchUser = await User.findOne({ username: userAuthToken.username });

    if (searchUser) {
      const userLastUpdatedAt = searchUser.lastUpdatedAt || new Date();
      const tokenLastUpdatedAt = new Date(userAuthToken.lastUpdatedAt);
      if (tokenLastUpdatedAt.getTime() === userLastUpdatedAt.getTime()) {
        console.log("Valid login".green);
      } else {
        console.log("User not found or not valid no more".red);
        return res.status(403).send("Forbidden error message.");
      }
    } else {
      console.log("User not found or not valid no more".red);
      return res.status(403).send("Forbidden error message.");
    }

    req.user = userAuthToken;
    next();
  } catch (err) {
    res.status(400).send(`Invalid token: ${err.message}`);
  }

}

export default authCheck;
