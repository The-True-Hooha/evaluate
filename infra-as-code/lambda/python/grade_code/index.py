import subprocess
import json


def lambda_handler(event, context):

    imports = ("import sys\nimport os")
    f = open("/tmp/solution.py", "w")
    body = event["body"]
    body = json.loads(body)

    code = f"""{imports}\n{body["src"]}"""
    test_cases = body["testCases"]
    skeletonCode = body["skeletonCode"]

    f.write(code)
    f.close()
    
    f = open("/tmp/solution.py", "a")
    f.write(f'\n{skeletonCode}')
    f.close()
    

    testCase_result = []

    f = open("/tmp/test.txt", "w")
    f.write(test_cases)
    f.close()

    with open("/tmp/test.txt") as test_case:
        for line in test_case:
            bashCommand = f"python3 /tmp/solution.py {line}"
            process = subprocess.run(
                bashCommand.split(), capture_output=True, text=True
            )
            testCase_result.append(process.stdout.rstrip())
            if process.stderr:
                return {
                    "statusCode": 400,
                    "headers": {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                    },
                    "body": json.dumps(process.stderr),
                }

    test = {
        "output" : testCase_result,
         "error" : process.stderr,
    }

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        "body": json.dumps(test),
    }
