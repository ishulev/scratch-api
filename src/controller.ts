import { getDentalClinics, getVetClinics } from "./query";

let dentalClinics: dentalClinic[], vetClinics: vetClinic[];
let loadingData = true;

Promise.all([getDentalClinics(), getVetClinics()]).then(([dental, vet]) => {
  dentalClinics = dental;
  vetClinics = vet;
  loadingData = false;
});

export const handleRequest = (url: string) => {
  if (loadingData) {
      return "Still loading, please wait and resend your request";
  }

  const nameMatch = url.match(/(?<=name\=)\w+&?/);
  const stateMatch = url.match(/(?<=state\=)\w+&?/);
  const toMatch = url.match(/(?<=to\=)(\d{1,2}(:\d{2})?)&?/);
  const fromMatch = url.match(/(?<=from\=)(\d{1,2}(:\d{2})?)&?/);

  return [];
};
