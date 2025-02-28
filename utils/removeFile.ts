import fs from "fs";

const removeFile = (fileAddress: string) => {
  fs.unlink(fileAddress, (error) => {
    throw error;
  });
};

export default removeFile;
