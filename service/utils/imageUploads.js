// const multer = require("multer");
// const MAX_SIZE = 7000000;
// const path = require('path')

// const imageFilter = (req, file, cb) => {
//   const allowTyped = ["image/png", "image/jpg", "image/jpeg"];

//   if (!allowTyped.includes(file.mimetype)) {
//     const error = new Error("Not Allowed");
//     error.code = "LIMIT_FILE_TYPES";
//     return cb(error, false);
//   }
//   cb(null, true);
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//   const dest = req.get('X-Is-Profile') ? 'profile' : 'image'
//   console.log(req.get('X-Is-Profile'));
//   cb(null, `uploads/${dest}`);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const filter = (err, req, res, next) => {
//   if (err.code === "LIMIT_FILE_TYPES") {
//     console.log(err.code);
//     res.status(406).json({
//       message: "Only images can allowed ",
//     });
//   }
//   if (err.code === "LIMIT_FILE_SIZE") {
//     console.log(err.code);
//     res.status(406).json({
//       message: `File too large,max is 1mb `,
//     });
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: MAX_SIZE,
//   },
//   fileFilter: imageFilter,
// });

// module.exports = { upload, filter };
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Set up Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req) => req.get('X-Is-Profile') ? 'profile' : 'image',
    format: async (req, file) => {
      const ext = file.mimetype.split('/')[1];
      return ext; // format file, misalnya 'jpg', 'png'
    },
    public_id: (req, file) => `${file.fieldname}-${Date.now()}`,
  },
});

const MAX_SIZE = 7000000;

// Filter untuk tipe file
const imageFilter = (req, file, cb) => {
  const allowTyped = ["image/png", "image/jpg", "image/jpeg"];
  if (!allowTyped.includes(file.mimetype)) {
    const error = new Error("Not Allowed");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }
  cb(null, true);
};

// Middleware untuk menangani error
const filter = (err, req, res, next) => {
  if (err.code === "LIMIT_FILE_TYPES") {
    res.status(406).json({ message: "Only images are allowed" });
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(406).json({ message: `File too large, max is 1MB` });
  }
};

// Setup multer untuk mengunggah file ke Cloudinary
const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_SIZE,
  },
  fileFilter: imageFilter,
});

module.exports = { upload, filter };
