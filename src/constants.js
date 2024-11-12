// User genders
const UserGenderEnum = Object.freeze({
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
});

const AvailableUserGenders = Object.freeze(Object.values(UserGenderEnum));

export { UserGenderEnum, AvailableUserGenders };
