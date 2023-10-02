
# s3presignedURL-sample

A sample in JS (Node) to generate and manage uploads of files with presigned URLs from S3



## Configure

Configure CORS of your bucket, for allow requests using presignedURLs, example:

```json
  {
    "CORSRules": [
        {
            "AllowedHeaders": [
                "*"
            ],
            "AllowedMethods": [
                "PUT"
            ],
            "AllowedOrigins": [
                "http://localhost:4200"
            ],
            "ExposeHeaders": []
        }
    ]
}
```

And also, check if you have the necessary permissions to put and get object.
### Tech Stack

**Client:** Angular, HttpClient

**Server:** Node, Express, AwsSdk

