const { watch } = require("fs");
const { execSync } = require('child_process')

watch("./src", function(event, filename) {
    execSync("yarn compile");
})