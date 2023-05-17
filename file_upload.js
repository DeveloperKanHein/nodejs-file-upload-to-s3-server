const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')

class FileUpload
{
    static instance;

    //Please store these data in .env file
    accessKeyId = "YOUR_ACCESS_KEY_ID";
    secretAccessKey = "YOUR_SECRET_ACCESS_KEY";
    region = "YOUR_REGION";

    s3 = new S3Client({
        credentials: {
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey
        },
        region: this.region
    });

    upload(dirName)
    {
        const multerUpload = multer({
            storage: multerS3({
              s3: this.s3,
              bucket: 'YOUR_BUCKET_NAME',
              acl: 'public-read',
              metadata: function (req, file, cb) {
                  cb(null, {fieldName: file.fieldname});
              },
              key: function (req, file, cb) {
                  cb(null,  dirName + Date.now().toString());
              }
            })
        });
        return multerUpload;
    }

    static getInstance = () => {
        if(!this.instance){
            this.instance = new FileUpload();
        }
        return this.instance;
    };
}

module.exports = FileUpload;