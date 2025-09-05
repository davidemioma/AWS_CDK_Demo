import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";

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
  }
}
