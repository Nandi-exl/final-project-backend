require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');
const { error } = require('console');
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region: region,
  accessKeyId: accessKey,
  secretAccessKey: secretAccessKey,
});

//fucntion that upload file to s3\
function uploadFile(files) {
  let data;
  files.map((file) => {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename,
    };
    data = s3.upload(uploadParams).promise();
  });

  return data;
}
exports.uploadFile = uploadFile;

// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;

//delete file from bucket
async function deleteFile(filename) {
  const params = {
    Bucket: bucketName,
    Key: filename,
  };

  try {
    await s3.headObject(params).promise();
    console.log('File Found in S3');
    try {
      await s3.deleteObject(params).promise();
      console.log('file deleted Successfully');
    } catch (err) {
      console.log('ERROR in file Deleting : ' + JSON.stringify(err));
    }
  } catch (err) {
    console.log('File not Found ERROR : ' + err.code);
  }
}
exports.deleteFile = deleteFile;
