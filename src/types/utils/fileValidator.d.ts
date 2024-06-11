// Type hint
type fileFilter = (
  req: Request,
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
  },
  cb: (error: Error | null, acceptFile: boolean) => void,
) => void;
