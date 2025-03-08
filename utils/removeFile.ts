import fs from "fs";

const removeFile = (fileAddress: string) => {
  const isFileExists = fs.existsSync(fileAddress);
  if (isFileExists) {
    fs.unlink(fileAddress, (error) => {
      throw error;
    });
  }
};

export default removeFile;
