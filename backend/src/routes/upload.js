import express from "express";
import multer from "multer";
import csvParser from "csv-parser";
import fs from "fs";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Specify the directory where uploaded files will be stored
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    // Define how the uploaded files will be named
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
//router.post("/", (req, res) => handleFileUpload(req, res));

// Handle file upload
router.post("/", upload.single("csvFile"), (req, res) => {
  console.log("in upload");
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Process the uploaded CSV file
  const filePath = req.file.path;

  const results = [];
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (data) => {
      // Process each row of data as it's read from the CSV file
      results.push(data);
    })
    .on("end", () => {
      // Now, 'results' contains an array of objects representing the CSV data
      // You can save this data to a database or perform search operations on it
      res.status(200).json({
        message: "File uploaded and processed successfully",
        data: results,
      });
    });
});

export default router;
