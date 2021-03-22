import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as iam from "@aws-cdk/aws-iam";

export class CdkcognitoAddpolicyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const PREFIX_NAME = id.toLocaleLowerCase().replace('stack', '')
    const ROLE_ARN = 'arn:aws:iam:0000000000:role/............'
    const BUCKET_NAME = 'my-bucket'
    
    const role = iam.Role.fromRoleArn(this, "role", ROLE_ARN);

    const bucket = s3.Bucket.fromBucketName(this, "bucket", BUCKET_NAME);

    const policy_statement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
    });

    policy_statement.addActions("s3:PutObject");
    policy_statement.addActions("s3:GetObject");
    policy_statement.addActions("s3:DeleteObject");

    policy_statement.addResources(
      bucket.arnForObjects("public/*")
    );
    policy_statement.addResources(
      bucket.arnForObjects("private/${cognito-identity.amazonaws.com:sub}/*")
    );
    policy_statement.addResources(
      bucket.arnForObjects("protected/${cognito-identity.amazonaws.com:sub}/*")
    );

    const list_policy_statement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
    });

    list_policy_statement.addActions("s3:ListBucket");
    list_policy_statement.addResources(bucket.bucketArn);

    const policy = new iam.Policy(this, "policy", {
      policyName: PREFIX_NAME + "-policy",
      statements: [policy_statement, list_policy_statement],
    });

    role.attachInlinePolicy(policy);
  }
}