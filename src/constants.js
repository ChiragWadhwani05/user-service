// User genders
const UserGenderEnum = Object.freeze({
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
});

const AvailableUserGenders = Object.freeze(Object.values(UserGenderEnum));

const Kafka = Object.freeze({
  TOPIC_NAME: "user",
  CONSUMER_GROUP_ID: "user-group",
});

export { UserGenderEnum, AvailableUserGenders, Kafka };
