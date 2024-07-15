const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let directory = 'src/public/uploads'
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
      cb(null, directory);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

  module.exports = upload;
