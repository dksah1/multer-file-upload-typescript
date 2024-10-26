import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";

const app = express();

const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.post(
  "/upload",
  upload.single("file"),
  (req: Request, res: Response): void => {
    if (!req.file) {
      res.status(400).send("No file uploaded");
      return;
    }

    res.status(200).json({
      message: "File uploaded successfully",
      file: req.file,
    });
  }
);

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
