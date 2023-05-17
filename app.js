const express = require('express');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const FileUpload = require('./file_upload.js');
const fileUpload = FileUpload.getInstance();

/*
  |- Please use .evn file
  |- accessKeyId, secretAccessKey, region and port are stored in .env
*/

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

const uploadUserData = fileUpload.upload("project_name/user/profile/").fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 8 }
]);

app.post('/upload', uploadUserData, function (req, res, next) {
  console.log(req.files);
  res.send('Your files are successfully uploaded');
})

app.listen(3000, (req, res) => {
  console.log("Server started at: 3000");
});