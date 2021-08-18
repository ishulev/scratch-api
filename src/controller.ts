import { getDentalClinics, getVetClinics } from "./query";

let dentalClinics: dentalClinic[], vetClinics: vetClinic[];
let loadingData = true;

Promise.all([getDentalClinics(), getVetClinics()]).then(([dental, vet]) => {
  dentalClinics = dental;
  vetClinics = vet;

  // Here is the place for splitting by state and from/to time

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

  return [
    ...vetClinics.filter((clinic) => {
      if (nameMatch && clinic.clinicName.indexOf(nameMatch[0]) === -1) {
        return false;
      }
      if (stateMatch && clinic.stateCode.indexOf(stateMatch[0]) === -1) {
        return false;
      }
      if (toMatch && clinic.opening.to < toMatch[0]) {
        return false;
      }
      if (fromMatch && clinic.opening.from > fromMatch[0]) {
        return false;
      }
      return true;
    }),
    ...dentalClinics.filter((clinic) => {
        if (nameMatch && clinic.name.indexOf(nameMatch[0]) === -1) {
          return false;
        }
        if (stateMatch && clinic.stateName.indexOf(stateMatch[0]) === -1) {
          return false;
        }
        if (toMatch && clinic.availability.to < toMatch[0]) {
          return false;
        }
        if (fromMatch && clinic.availability.from > fromMatch[0]) {
          return false;
        }
        return true;
      }),
  ];
};
