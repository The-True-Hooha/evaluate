const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const passwordComplexity = require("joi-password-complexity");

//user schema
const testSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      label: "jobId",
    }
},
  { collection: "sqs_test" }
);

module.exports = testSchema