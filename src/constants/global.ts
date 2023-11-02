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

export const facultyOptions = [
  {
    label: "Engineering",
    value: "engineering",
  },
  {
    label: "Faculty of science and engineering",
    value: "Faculty of science and engineering",
  },
];
export const academicDepartmentOptions = [
  {
    label: "CSE",
    value: "cse",
  },
  {
    label: "Software Engineering",
    value: "software engineering",
  },
];
export const academicSemesterOptions = [
  {
    label: "Fall 2023",
    value: "fall2023",
  },
  {
    label: "Autumn 2023",
    value: "autumn2023",
  },
  {
    label: "Summer 2023",
    value: "summer2023",
  },
];
