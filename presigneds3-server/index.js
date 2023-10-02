const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const cors = require('cors');

//Configure the AWS SDK if is using localstack or AWS environment (I recommend using IAM Roles and Policies)
AWS.config.update({
  s3: {
    endpoint: 'http://localhost:4566', //LocalStack S3 environment
    s3ForcePathStyle: true, // Necessary in LocalStack
    accessKeyId: 'localstack', // your credentials
    secretAccessKey: 'localstack', // your credentials
    region: 'us-east-1', // Replace for necessary region
  },
});

const app = express();
const port = 8084;
const s3 = new AWS.S3();
const bucketName = 'test'

app.use(cors());
app.use(bodyParser.json());

app.post('/presignedurl', async (req, res) => {
  if (!req.body || !req.body.filename) {
    return res.status(400).json({ error: 'RequestBody needs to contain the object "filename".' });
  }

  const signedUrl = s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: req.body.filename,
    Expires: 300, // The URL expires in 5 minutes
  });

  const responseJson = { message: 'Success!', presignedurl: signedUrl };
  res.json(responseJson);
});

app.listen(port, () => {
  console.log(`Server listening ${port}`);
});
