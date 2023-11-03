// Genders
export const gendersData = ["male", "female"];

export const genderOptions = gendersData?.map((gender) => {
  return {
    label: gender.charAt(0).toUpperCase() + gender.slice(1),
    value: gender,
  };
});

// Blood Group
export const bloodGroupData = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const bloodGroupOptions = bloodGroupData?.map((group) => {
  return {
    label: group,
    value: group,
  };
});

export const academicSemesterOptions = [
  {
    label: "Autumn",
    value: "Autumn",
  },
  {
    label: "Summer",
    value: "Summer",
  },
  {
    label: "Fall",
    value: "Fall",
  },
];

export const academicSemesterTitleCodeMapper = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const monthOptions = months.map((month: string) => {
  return {
    label: month,
    value: month,
  };
});

export const days = [
  "SATURDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
];
export const daysOptions = days.map((day: string) => {
  return {
    label: day,
    value: day,
  };
});
