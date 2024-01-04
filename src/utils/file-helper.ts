import fs from "fs";

export const removeFile = (path?: string) => {
  if (!path) return;

  // We need to get actual path to remove the file
  const actualPath = `.${path}`;

  // Removing the file
  if (fs.existsSync(actualPath)) {
    fs.unlinkSync(actualPath);
  }
};
