const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
//Multer : Çok parçalı/form verilerini işlemek içinmulter kullanacaktır.

let storage = multer.diskStorage({
     // yüklenen dosyaların saklanacağı klasörü belirler.
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/uploads/");
  },
  //hedef klasör içindeki dosyanın adını belirler.
  filename: (req, file, cb) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
      return callback(message, null);
    }

    var filename = `${Date.now()}-firat-${file.originalname}`;
    console.log(filename);
    cb(null, filename);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize }, // Dosya boyutunu kısıtlamak için
}).array("file",10);

// Util.promisify() dışa aktarılan ara yzılım nesnesinin asyns.await ile kullanılabilmesini sağlar
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;