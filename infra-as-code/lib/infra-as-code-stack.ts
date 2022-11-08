import { Duration, RemovalPolicy, SecretValue, Stack, StackProps } from "aws-cdk-lib";
import * as sqs from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import * as rds from "aws-cdk-lib/aws-rds"
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager"
import * as ec2 from "aws-cdk-lib/aws-ec2"


export class InfraAsCodeStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'evaluate-vpc', {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      vpcName: 'evaluate-vpc',
      enableDnsHostnames: true,
      enableDnsSupport: true,
      natGateways: 0,
      subnetConfiguration: [{
        name: 'evaluate-rds-public1a',
        subnetType: ec2.SubnetType.PUBLIC,
        cidrMask: 24
      }],
      maxAzs: 2
    });

    const subnetGroup = new rds.SubnetGroup(this, 'evaluate-rds-sg', {
      description: 'subnet group for evaluate-rds',
      vpc,
      removalPolicy: RemovalPolicy.DESTROY,
      subnetGroupName: 'evaluate-rds-sg',
      vpcSubnets: {
        availabilityZones: ['us-east-1a', "us-east-1b"],
        subnets: vpc.publicSubnets,
      }
    })

    const evaluateSG = new ec2.SecurityGroup(this, "evaluate-rds-secG", {
      vpc,
      allowAllOutbound: true,
      description: 'evaluate-vpc-secG'
    });

    evaluateSG.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.allTraffic())

    const instance = new rds.DatabaseInstance(this, 'database-store', {
      vpc,
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_0_28
      }),
      credentials: {
        username: 'admin',
        password: SecretValue.ssmSecure('evaluate-rds-password')
      },
      databaseName: "evaluate",
      instanceIdentifier: 'db-evaluate',
      publiclyAccessible: true,
      subnetGroup,
      removalPolicy: RemovalPolicy.DESTROY,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      securityGroups: [evaluateSG]
    })

    const queue = new sqs.Queue(this, "code-submission-queue", {
      queueName: "codeSubmission.fifo",
      visibilityTimeout: Duration.minutes(15),
      retentionPeriod: Duration.seconds(1209600),
    });

    const trigger = new SqsEventSource(queue);

    const fn = new lambda.Function(this, "lambda-fn", {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: "index.lambda_handler",
      code: lambda.Code.fromAsset("lambda/python"),
      timeout: Duration.seconds(5),
      events: [trigger]
    });
  }
}
