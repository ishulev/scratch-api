"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDentalClinics = void 0;
const http = __importStar(require("https"));
const URL_DENTAL_CLINICS = "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json";
function get(url) {
    return new Promise((resolve, reject) => {
        http
            .get(url, (res) => {
            const { statusCode } = res;
            const contentType = res.headers["content-type"]
                ? res.headers["content-type"]
                : "";
            let error;
            // Any 2xx status code signals a successful response but
            // here we're only checking for 200.
            if (statusCode !== 200) {
                error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
            }
            else if (!/^application\/json/.test(contentType)) {
                error = new Error("Invalid content-type.\n" +
                    `Expected application/json but received ${contentType}`);
            }
            if (error) {
                console.error(error.message);
                // Consume response data to free up memory
                res.resume();
                return;
            }
            res.setEncoding("utf8");
            let rawData = "";
            res.on("data", (chunk) => {
                rawData += chunk;
            });
            res.on("end", () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                }
                catch (e) {
                    reject(e);
                }
            });
        })
            .on("error", (e) => {
            reject(e);
        });
    });
}
const getDentalClinics = function () {
    return get(URL_DENTAL_CLINICS);
};
exports.getDentalClinics = getDentalClinics;
