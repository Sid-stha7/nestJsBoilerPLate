import fs from "fs";
import dayjs from "dayjs";

import { diskStorage, memoryStorage } from "multer";
import { BadRequestException } from "@nestjs/common";

/**
 *
 */
export const imageUploadFilter: fileFilter = (_req, file, cb) => {
  const fileSize = parseInt(_req.headers["content-length"]);
  const maxSize = 5 * 1024 * 1024; // 2MB

  if (!file.mimetype.startsWith("image")) {
    return cb(new BadRequestException("Only images are allowed!"), false);
  }

  if (fileSize > maxSize) {
    return cb(
      new BadRequestException("Image size exceeds the allowed limit."),
      false,
    );
  }

  cb(null, true);
};

export const cvsUploadFilter: fileFilter = (_req, file, cb) => {
  if (file.mimetype.endsWith("csv")) {
    cb(null, true);
  } else {
    cb(new BadRequestException(["Only CSV are allowed."]), false);
  }
};

/**
 *
 */
export const multerDiskStorage = diskStorage({
  destination: (_req, _file, callback) => {
    const folderName = dayjs().format("YYYY-MM");
    const fullDirectory = `./uploads/${folderName}`;

    // node.js create directory if doesn't exists
    if (!fs.existsSync(fullDirectory)) {
      fs.mkdirSync(fullDirectory, { recursive: true });
    }

    return callback(null, fullDirectory);
  },
  filename: (req, file, callback) => {
    const userId = req.user.id ?? "unauth";

    const fName = `${userId}-${Date.now()}-${file.originalname}`;

    callback(null, fName);
  },
});
export const multerMemoryStorage = memoryStorage();
