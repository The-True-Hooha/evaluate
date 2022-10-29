import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ec2 from "aws-cdk-lib/aws-ec2"
import * as ecs from "aws-cdk-lib/aws-ecs"
import { Construct } from 'constructs';

export class InfraAsCodeStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'InfraAsCodeQueue', {
      fifo: true,
      queueName: "codeSubmission.fifo"
    });

    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', {
      isDefault: true,
    });

    const cluster = new ecs.Cluster(this, 'FargateCluster', { vpc: vpc, clusterName: "codeSubmissionCluster" });

    const fargateTaskDefinition = new ecs.FargateTaskDefinition(this, 'evaluate-TaskDef', {
      memoryLimitMiB: 512,
      cpu: 256,
      ephemeralStorageGiB: 100,
    });

    const containerDefinition = fargateTaskDefinition.addContainer('evaluate-fargate', {
      image: ecs.ContainerImage.fromAsset("./image"),
      memoryLimitMiB: 256,
    });

    const service = new ecs.FargateService(this, 'Service', {
      cluster,
      taskDefinition: fargateTaskDefinition,
      desiredCount: 1,
    });


  }
}
