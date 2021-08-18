const { watch } = require("fs");
const { spawn } = require("child_process");
const { kill } = require("process");

let serveProcess, compileProcess;

function compileAndServe() {
  compileProcess = spawn("yarn", ["run", "compile"]);
  compileProcess.on("close", function (code) {
    if (code === 0) {
      if (serveProcess) {
        console.log(serveProcess.killed);
        // serveProcess.stdin.pause();
        // serveProcess.stdin.end();
        // spawn("sh", ["-c", "kill -INT -" + serveProcess.pid]);
        serveProcess.kill();
      } else {
        serveProcess = spawn("node", ["dist/index.js"]);
      }
      console.log(serveProcess.pid);
      serveProcess.on("close", function (code, signal) {
        console.log("CODE => " + code);
        console.log("SIGNAL => " + signal);
        serveProcess = spawn("node", ["dist/index.js"]);
      });
      serveProcess.stderr.on("data", (data) => {
        console.error(`grep stderr: ${data}`);
      });
    }
  });
}

let timeout = null;

compileAndServe();

watch("./src", function (event, filename) {
  if (timeout) {
    clearTimeout(timeout);
  }
  // For some reason the watcher fires twice in a row
  timeout = setTimeout(() => {
    console.log("recompiling");
    compileAndServe();
  }, 100);
});
