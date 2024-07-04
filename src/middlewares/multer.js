import multer from "multer";
import path from 'path'

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Specify the filename for uploaded files
  },
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // Specify file size limit (5MB in this example)
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb); // Custom function to check file type
  },
}).array("files", 10); // Specify the field name used in the form for multiple file uploads and the maximum number of files allowed

// Check file type
function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check the file extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check the MIME type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true); // File type is allowed
  } else {
    cb("Error: Only images are allowed!"); // File type is not allowed
  }
}

// Middleware function to handle file uploads
const uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer error occurred
      return res.status(400).json({ error: "Multer error: " + err.message });
    } else if (err) {
      // Other errors occurred
      return res.status(500).json({ error: "Error: " + err });
    }
    // No errors, proceed to the next middleware or route handler
    next();
  });
};

export default uploadMiddleware;
