import subprocess
import json
import boto3


def lambda_handler(event, context):
    db = boto3.client("dynamodb")

    f = open("/tmp/test.py", "w")
    body = event["Records"][0]["body"]
    body = json.loads(body)

    code = f"""{body["src"]}"""

    f.write(code)
    f.close()

    bashCommand = "python /tmp/test.py"
    process = subprocess.Popen(
        bashCommand.split(), stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    output, error = process.communicate()

    db.put_item(
        TableName="evaluateCacheStore",
        Item={
            "jobId": {"S": body["jobId"]},
            "output": {"S": output.decode("UTF-8")},
            "error": {"S": error.decode("UTF-8")},
        },
    )

    return {"statusCode": 200, "body": json.dumps("dsafdsfs")}
