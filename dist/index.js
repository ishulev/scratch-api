"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const query_1 = require("./query");
query_1.getDentalClinics().then(console.log);
function test() {
    console.log("Test");
    return "Test";
}
server_1.default.listen(8000);
