import Schema from "validate";
import {
  descriptionValidation,
  descriptionEditValidation,
} from "#u/bodyCustomValidations.ts";

const postValidations = new Schema(
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
    subject: {
      type: String,
      length: { min: 3, max: 10 },
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    folder: {
      type: String,
      required: false,
    },
    labelColor: {
      type: String,
      required: false,
      match: /^badge-\S+$/,
      message: "labelColor is not valid",
    },
    isListTodo: {
      type: Number,
      enum: [0, 1],
    },
    description: {
      type: String,
      use: { descriptionValidation },
      message: "description or listItems validations failed",
    },
    listItems: [
      {
        type: String,
        length: { min: 3, max: 18 },
        required: false,
        message: "listItems must be an array of strings",
      },
    ],
  },
  { strict: true }
);

const putValidations = new Schema(
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
    subject: {
      type: String,
      length: { min: 3, max: 10 },
      required: false,
    },
    priority: {
      type: String,
      required: false,
    },
    folder: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    labelColor: {
      type: String,
      required: false,
      match: /^badge-\S+$/,
      message: "labelColor is not valid",
    },
    isListTodo: {
      type: Number,
      enum: [0, 1],
    },
    description: {
      type: String,
      use: { descriptionEditValidation },
      message: "description or listItems validations failed",
    },
    listItems: [
      {
        type: String,
        length: { min: 3, max: 18 },
        required: false,
        message: "listItems must be an array of strings",
      },
    ],
  },
  { strict: true }
);

export { postValidations, putValidations };
