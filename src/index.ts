import server from "./server";
import { getDentalClinics } from "./query";

getDentalClinics().then(console.log);

function test(): string {
    console.log("Test");
    return "Test";
}

server.listen(8000);