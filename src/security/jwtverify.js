import jwt from "jsonwebtoken";

const JWTVerify = (data) => {
  jwt.verify(data, process.env.KEY, (err, credentials) => {
    if (credentials) {
      return credentials;
    } else {
      return err;
    }
  });
};

export default JWTVerify;
