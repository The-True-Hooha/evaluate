import subprocess
import json


def lambda_handler(event, context):

    imports = ("import sys\nimport os")
    f = open("/tmp/solution.py", "w")
    body = event["body"]
    body = json.loads(body)

    code = f"""{imports}\n{body["src"]}"""

    f.write(code)
    f.close()
    
    bashCommand = f"python3 /tmp/solution.py"
    process = subprocess.run(
        bashCommand.split(), capture_output=True, text=True
    )
          
    result = {
        "output" : process.stdout,
         "error" : process.stderr,
    }

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        "body": json.dumps(result),
    }
