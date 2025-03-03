import Schema from "validate";

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
    checked: {
      type: Array,
      required: true,
    },
  },
  { strict: true }
);

export { postValidations, putValidations };
