import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Bucket, CfnBucket, EventType } from "aws-cdk-lib/aws-s3";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { SqsDestination } from "aws-cdk-lib/aws-s3-notifications";

export class AwsCdkTutorialStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // L1 and L2 construct of an s3 bucket
    const lv1S3Bucket = new CfnBucket(this, "MyLv1Bucket", {
      bucketName: "my-lv1-bucket",
      versioningConfiguration: {
        status: "Enabled",
      },
    });

    const lv2S3Bucket = new Bucket(this, "MyLv2Bucket", {
      bucketName: "my-lv2-bucket",
      versioned: true,
    });

    // AWS SQS
    const queue = new Queue(this, "myQueue", {
      queueName: "my-queue",
    });

    // Linking S3 to SQS - Add notification for CREATED events
    lv2S3Bucket.addEventNotification(
      EventType.OBJECT_CREATED, // Triggers on Create operations
      new SqsDestination(queue) // Sends message to SQS
    );
  }
}
