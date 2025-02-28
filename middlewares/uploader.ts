import multer from "multer";
import crypto from "crypto";
import path from "path";

const multerConfigs = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public", "covers"));
  },

  filename: (req, file, cb) => {
    const hashName = crypto
      .createHash("SHA256")
      .update(file.originalname)
      .digest("hex");

    const fileName = hashName + Date.now();

    const validFormats = [".jpg", ".jpeg", ".png"];

    const ext = path.extname(file.originalname);

    if (validFormats.includes(ext)) {
      cb(null, fileName + ext);
    } else {
      cb(new Error("invalid file format (.png or .jpg)"), "");
    }
  },
});

const uploader = multer({
  storage: multerConfigs,
  limits: { fileSize: 3000000 },
}).single("cover");

export default uploader;
