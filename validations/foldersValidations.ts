import Schema from "validate";

const validation = new Schema(
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
    name: {
      type: String,
      length: { min: 3, max: 10 },
      required: true,
    },
  },
  { strict: true }
);

export { validation };
