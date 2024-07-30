const multer = require("multer");
const MAX_SIZE = 7000000;
const path = require('path')

const imageFilter = (req, file, cb) => {
  const allowTyped = ["image/png", "image/jpg", "image/jpeg"];

  if (!allowTyped.includes(file.mimetype)) {
    const error = new Error("Not Allowed");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
  const dest = req.get('X-Is-Profile') ? 'profile' : 'image'
  console.log(req.get('X-Is-Profile'));
  cb(null, `uploads/${dest}`);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const filter = (err, req, res, next) => {
  if (err.code === "LIMIT_FILE_TYPES") {
    console.log(err.code);
    res.status(406).json({
      message: "Only images can allowed ",
    });
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    console.log(err.code);
    res.status(406).json({
      message: `File too large,max is 1mb `,
    });
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_SIZE,
  },
  fileFilter: imageFilter,
});

module.exports = { upload, filter };
