import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ec2 from "aws-cdk-lib/aws-ec2"
import * as ecs from "aws-cdk-lib/aws-ecs"
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns"
import { Construct } from 'constructs';

export class InfraAsCodeStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'InfraAsCodeQueue', {
      fifo: true,
      queueName: "codeSubmission.fifo",
      receiveMessageWaitTime: Duration.seconds(20),
      retentionPeriod: Duration.seconds(345600),
      visibilityTimeout: Duration.seconds(43200),
    });

    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', {
      isDefault: true,
    });

    const cluster = new ecs.Cluster(this, 'FargateCluster', { vpc: vpc, clusterName: "codeSubmissionCluster" });

    const queueProcessingFargateService = new ecsPatterns.QueueProcessingFargateService(this, 'evaluate-fargate-queue', {
      cluster,
      image: ecs.ContainerImage.fromAsset("./fargate-workers"),
      queue: queue,
      serviceName: "fargate-daemon"
    });

  }
}
