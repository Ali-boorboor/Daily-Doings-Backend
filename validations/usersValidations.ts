import Schema from "validate";

const signupValidations = new Schema(
  {
    username: {
      type: String,
      length: { max: 20 },
      required: true,
      match: /^[a-zA-Z0-9_.]{1,20}$/,
      message: "Invalid username",
    },
    email: {
      type: String,
      match: /^(([^@\s]+)@([\w-]+\.)+[\w-]{2,5})$/,
      required: true,
      message: "Invalid email",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { strict: true }
);

const loginValidations = new Schema(
  {
    identifier: {
      type: String,
      match: /^(([^@\s]+)@([\w-]+\.)+[\w-]{2,5})|^[a-zA-Z0-9_.]{1,20}$/,
      required: true,
      message: "Invalid identifier: must be a valid email or username",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { strict: true }
);

const changePassValidations = new Schema(
  {
    user: {
      type: Object,
      schema: {
        _id: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
      },
    },
    currentPassword: {
      type: String,
      required: true,
    },
    newPassword: {
      type: String,
      required: true,
    },
  },
  { strict: true }
);

const changeUsernameValidations = new Schema(
  {
    user: {
      type: Object,
      schema: {
        _id: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
      },
    },
    newUsername: {
      type: String,
      length: { max: 20 },
      required: true,
      match: /^[a-zA-Z0-9_.]{1,20}$/,
      message: "Invalid username",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { strict: true }
);

const changeCoverValidations = new Schema(
  {
    user: {
      type: Object,
      schema: {
        _id: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { strict: true }
);

const forgotPassValidations = new Schema(
  {
    identifier: {
      type: String,
      match: /^(([^@\s]+)@([\w-]+\.)+[\w-]{2,5})|^[a-zA-Z0-9_.]{1,20}$/,
      required: true,
      message: "Invalid identifier: must be a valid email or username",
    },
  },
  { strict: true }
);

export {
  signupValidations,
  loginValidations,
  changePassValidations,
  changeUsernameValidations,
  changeCoverValidations,
  forgotPassValidations,
};
