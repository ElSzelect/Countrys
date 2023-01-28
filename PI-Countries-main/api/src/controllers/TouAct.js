const { TouristActivity } = require("../db");

const CreateActivity = async (name, difficulty, duration, season) =>
  await TouristActivity.create({ name, difficulty, duration, season });

const GetActivity = async () => await TouristActivity.findAll()

module.exports = { CreateActivity , GetActivity};
