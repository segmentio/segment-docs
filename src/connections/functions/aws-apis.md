---
title: 'Set up functions for calling AWS APIs'
integration_type: feature
---

The [`aws-sdk`](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html){:target="_blank"} module is built-in, which allows you to make calls to AWS services in your own AWS accounts. The AWS SDK requires additional setup to ensure access to your AWS resources is secure. This page describes the process for allowing your functions to securely call AWS APIs in your AWS account.

To set up your functions to call AWS APIs:
1. Create an IAM role in your AWS account that your function will assume before making AWS API calls.
    1. Make sure you have these two values:
      * **Principal account ID**: This is the ID number for the AWS account that your function runs in. For destination functions, this is `458175278816` and for source functions this is `300240842537`.
      * **External ID**: This is the value your IAM role uses to ensure that only your functions have the ability to assume the role. Segment recommends you to choose a long string of at least 32 random characters and treat it as if it were an API key or a password.
    2. Create an IAM role in your AWS account with the [minimum set of necessary permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege){:target="_blank"}.
    3. Add a trust relationship to your role with the following policy, filling in the principal account ID and external ID from step 1.1:
      ```json
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "AWS": "<PRINCIPAL_ACCOUNT_ID>"
              },
              "Action": "sts:AssumeRole",
              "Condition": {
                "StringEquals": {
                  "sts:ExternalId": "<EXTERNAL_ID>"
                }
              }
            }
          ]
        }
      ```

2. Create your function.
  <br> Now that you have an IAM role in your AWS account, you can create your source or destination function. Segment recommends you to use function settings to make the IAM role configurable. This allows you to use different roles for different instances of your function and to securely store your external ID value by making it a "sensitive" setting. Here are the required settings:
  * **IAM Role ARN**: A string setting that is the ARN for the IAM role above. For example, `arn:aws:iam::1234567890:role/my-secure-role`.
  * **IAM Role External ID**: A sensitive string setting that is the external ID for your IAM role.

    Below is an example destination function that uploads each event received to an S3 bucket (configured using additional "S3 Bucket" and "S3 Bucket Region" settings). It uses the built-in local cache to retain S3 clients between requests to minimize processing time and to allow different instances of the function to use different IAM roles.

    ```javascript
    async function getS3(settings) {
      const ttl = 30 * 60 * 1000; // 30 minutes
      const key = [settings.iamRoleArn, settings.s3Bucket].join();

      return cache.load(key, ttl, async () => {
        const sts = new AWS.STS();

        const opts = await sts
          .assumeRole({
            RoleArn: settings.iamRoleArn,
            ExternalId: settings.iamRoleExternalId,
            RoleSessionName: 'segment-function'
          })
          .promise()
          .then(data => {
            return {
              region: settings.s3BucketRegion,
              accessKeyId: data.Credentials.AccessKeyId,
              secretAccessKey: data.Credentials.SecretAccessKey,
              sessionToken: data.Credentials.SessionToken
            };
          });

        return new AWS.S3();
      });
    }

    async function onTrack(event, settings) {
      const s3 = await getS3(settings);

      return s3
        .putObject({
          Bucket: settings.s3Bucket,
          Key: `${event.type}/${Date.now()}.json`,
          Body: JSON.stringify(event)
        })
        .promise()
        .then(data => {
          console.log(data);
        });
    }
    ```
