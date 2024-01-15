const createHttpError = require('http-errors');
const multer = require('multer');
const path = require('path');


const Uploader = (uploadFileName, mimeTypes, maxSize) => {
    // Setup Storage Engine
    const UploadDir = path.join(__dirname, '../../public/uploads/', uploadFileName);
    const MaxFileSize = maxSize * 1024 * 1024;

    console.log(UploadDir)
    const StorageEngine = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UploadDir);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName = `${Date.now()}_avatar${fileExt}`;
            cb(null, fileName);
        }
    });

    const upload = multer({
        storage: StorageEngine,
        limits: {
            fileSize: MaxFileSize
        },
        fileFilter: (req, file, cb) => {
            if(mimeTypes.includes(file.mimetype)){
                if(file.size >= MaxFileSize){
                    cb(createHttpError(406, `Max Size Of File: ${maxSize}MB`));
                }else{
                    cb(null, true);
                }
            }else{
                cb(createHttpError(406, `Only ${mimeTypes.toString()} Files Are Allowd`));
            }
        }
    });

    return upload;
}

module.exports = Uploader;