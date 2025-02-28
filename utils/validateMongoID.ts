import { isValidObjectId } from "mongoose";

const validateMongoID = (props: { id: string; field: string }) => {
  try {
    if (props?.id && !isValidObjectId(props?.id)) {
      throw {
        status: 422,
        message: `${props?.id} id is not valid`,
        field: props?.field,
      };
    }
  } catch (error) {
    throw error;
  }
};

export default validateMongoID;
