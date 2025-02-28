import nodemailer from "nodemailer";

const emailConfigs = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  from: process.env.EMAIL,
});

export default emailConfigs;
