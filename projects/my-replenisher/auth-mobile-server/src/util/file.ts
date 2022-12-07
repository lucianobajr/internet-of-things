import fs from "fs";
import { resolve } from "path";

import upload from "../config/upload";

export const deleteFile = async (file: string): Promise<void> => {
  const filename = resolve(`${upload.tmpFolder}`, file);

  try {
    await fs.promises.stat(filename);
  } catch {
    return;
  }
  await fs.promises.unlink(filename);
};
