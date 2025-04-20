import multer from "multer"
import path from "path"
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary';
import { ICloudinaryResponse, IFile } from "../app/interfaces/file";


// cloudinary.config({
//     cloud_name: 'dbgrq28js',
//     api_key: '173484379744282',
//     api_secret: 'eHKsVTxIOLl5oaO_BHxBQWAK3GA'
// });
cloudinary.config({
    cloud_name: 'dd3w1s9gq',
    api_key: '535591576698435',
    api_secret: '6T61U9W7o6tplbAc3MS6spiwpjY'
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const uploadToCloudinary = async (file: IFile): Promise<ICloudinaryResponse | undefined> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path,
            (error: Error, result: ICloudinaryResponse) => {
                fs.unlinkSync(file.path)
                if (error) {
                    reject(error)
                }
                else {
                    resolve(result)
                }
            })
    })
};

export const fileUploader = {
    upload,
    uploadToCloudinary
}