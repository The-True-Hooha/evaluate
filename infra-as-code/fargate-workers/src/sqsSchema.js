const mongoose = require('mongoose')
const sqsTestSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        label: "firstName",
      },
    },
    { collection: "sqsTest" }
  );

  module.exports = mongoose.model('sqsTest', sqsTestSchema)
  