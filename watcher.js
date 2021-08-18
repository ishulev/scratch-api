const { watch } = require("fs");
const { execSync } = require('child_process')

let timeout = null;

watch("./src", function(event, filename) {
    if(timeout) {
        clearTimeout(timeout);
    }
    // For some reason the watcher fires twice in a row
    timeout = setTimeout(() => {
        console.log("compiling!");
        execSync("yarn compile");
    }, 100);
})