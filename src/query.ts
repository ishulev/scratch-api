import * as http from "https";

const URL_DENTAL_CLINICS =
  "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json";

function get(url: string) {
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
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error(
            "Invalid content-type.\n" +
              `Expected application/json but received ${contentType}`
          );
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
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", (e) => {
        reject(e);
      });
  });
}

export const getDentalClinics = function () {
  return get(URL_DENTAL_CLINICS);
};
