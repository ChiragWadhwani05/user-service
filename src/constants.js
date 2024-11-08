// ============================================================================
//                                 USER MODEL
// ============================================================================

// User roles

const UserRoleEnum = Object.freeze({
  ADMIN: "ADMIN",
  USER: "USER",
});

const AvailableUserRoles = Object.freeze(Object.values(UserRoleEnum));

// User genders
const UserGenderEnum = Object.freeze({
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
});

const AvailableUserGenders = Object.freeze(Object.values(UserGenderEnum));

export {
  UserRoleEnum,
  AvailableUserRoles,
  UserGenderEnum,
  AvailableUserGenders,
};
