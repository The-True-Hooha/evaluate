import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ec2 from "aws-cdk-lib/aws-ec2"
import * as ecs from "aws-cdk-lib/aws-ecs"
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns"
import * as autoScale from "aws-cdk-lib/aws-applicationautoscaling"
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam'


export class InfraAsCodeStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    let queue = new sqs.Queue(this, 'InfraAsCodeQueue', {
      fifo: true,
      queueName: "codeSubmission.fifo",
      receiveMessageWaitTime: Duration.seconds(20),
      retentionPeriod: Duration.seconds(345600),
      visibilityTimeout: Duration.seconds(43200),
    });


    const ecsRole = new iam.Role(this, 'TaskExecutionRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com')
    })


    ecsRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonECSTaskExecutionRolePolicy'));

    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', {
      isDefault: true,
    });

    const cluster = new ecs.Cluster(this, 'FargateCluster', { vpc: vpc, clusterName: "codeSubmissionCluster" });
    const fargateTaskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDef', {
      memoryLimitMiB: 512,
      cpu: 256,
      executionRole: ecsRole
     
    });

    fargateTaskDefinition.addContainer("main-container", {
      image: ecs.ContainerImage.fromAsset("./fargate-workers"),
      containerName : "code-sub-daemon"
    })

    const queueProcessingFargateService = new ecsPatterns.QueueProcessingFargateService(this, 'evaluate-fargate-queue', {
      cluster,
      image: ecs.ContainerImage.fromAsset("./fargate-workers"),
      queue: queue,
      serviceName: "fargate-daemon",
      scalingSteps: [
        { "upper": 0, "change": 0 },
        { "lower": 1, "change": +1 },
      ],
      minScalingCapacity: 0,
      maxScalingCapacity: 2,
      assignPublicIp : true

    });

    //scale down logic
  //   const fargateServiceCpuMetric = queueProcessingFargateService.service.metricCpuUtilization({
  //     period: Duration.minutes(3),
  //     statistic: "Average"
  //   })

  //   const fargateScaleIn = fargateServiceCpuMetric.createAlarm(this, "fargate-LowCpuAlarm", {
  //     alarmDescription: "When task is idle, remove it",
  //     alarmName: "fargateLowCpuUtil",
  //     threshold: 0.01,
  //     evaluationPeriods: 1,
  //     actionsEnabled: true,
  //     datapointsToAlarm: 1,
  //   })

  //   // const scalableTarget = autoScale.ScalableTarget.fromScalableTargetId(this, "fargate-scalableTarget",
  //   //   `service/${queueProcessingFargateService.cluster.clusterName}/${queueProcessingFargateService.service.serviceName}|ecs:service:DesiredCount|ecs`
  //   // )

  //   const target = new autoScale.ScalableTarget(this, "scalable-target", {
  //     serviceNamespace : autoScale.ServiceNamespace.ECS,
  //     resourceId: `service/${queueProcessingFargateService.cluster.clusterName}/${queueProcessingFargateService.service.serviceName}`,
  //     scalableDimension: 'ecs:service:DesiredCount',
  //     minCapacity : 0,
  //     maxCapacity: 3
  //   })


  //   const stepScalingAction = new autoScale.StepScalingAction(this, "scaleToZero", {
  //     scalingTarget: target,
  //     adjustmentType: autoScale.AdjustmentType.EXACT_CAPACITY
  //   })

  //   stepScalingAction.addAdjustment({
  //     adjustment: 0,
  //     upperBound: 0
  //   })
  //   fargateScaleIn.addAlarmAction(new ApplicationScalingAction(stepScalingAction))
  }
}
