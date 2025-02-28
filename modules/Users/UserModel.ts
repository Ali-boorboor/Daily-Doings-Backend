import usersSchema from "#s/usersSchema.ts";
import hashPassword from "#u/hashPassword.ts";
import mongoose from "mongoose";

usersSchema.pre("save", function (next) {
  try {
    this.password = hashPassword(this?.password);

    next();
  } catch (error: any) {
    next(error);
  }
});

usersSchema.pre("findOneAndUpdate", function (next) {
  try {
    const updateDatas: any = this.getUpdate();

    if (updateDatas?.password) {
      updateDatas.password = hashPassword(updateDatas?.password);
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

const UserModel = mongoose.model("users", usersSchema);

export default UserModel;
