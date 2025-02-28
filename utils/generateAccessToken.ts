import jwt from "jsonwebtoken";

const generateAccessToken = (payload: any) => {
  try {
    return jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN!, {
      expiresIn: "10d",
    });
  } catch (error) {
    throw error;
  }
};

export default generateAccessToken;
