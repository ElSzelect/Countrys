const { Country, TouristActivity } = require("../db");
const { Op } = require("sequelize");

const GetCountries = async () => {
  const db = await Country.findAll();
  return db;
};

function GetCountryDetail(id) {
  return Country.findByPk(id.toUpperCase(), {
    include: [
      {
        model: TouristActivity,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  }).then((response) =>
    response ? response : "We're sorry, no matches were found for your search"
  );
}

function GetCountriesOrdered(order, param) {
  let countries = [];
  return Country.findAll({ order: [[param, order]] }).then((response) => {
    response.forEach((co) =>
      countries.push({
        name: co.name,
        flag: co.flag,
        continent: co.continent,
        id: co.id,
        population: co.population,
      })
    );
    return countries;
  });
}

function SearchCountries(name) {
  let countries = [];
  name = name.toLowerCase();
  return Country.findAll({
    where: {
      name: {
        [Op.or]: {
          [Op.like]: "%" + name + "%",
          [Op.iLike]: "%" + name,
          [Op.substring]: name,
          [Op.substring]: name[0].toUpperCase() + name.substring(1),
        },
      },
    },
  }).then((response) => {
    if (response.length) {
      response.forEach((c) =>
        countries.push({
          name: c.name,
          continent: c.continent,
          flag: c.flag,
          id: c.id,
          population: c.population,
        })
      );
      return countries;
    } else
      return { message: `We're sorry, no matches were found for your search` };
  });
}

function FilterCountries(filter) {
  let countries = [];
  console.log(filter);
  return TouristActivity.findOne({
    where: { name: filter },
    include: [
      {
        model: Country,
      },
    ],
  }).then((response) => {
    // return response
    response.Countries.forEach((co) =>
      countries.push({
        name: co.name,
        flag: co.flag,
        continent: co.continent,
        id: co.id,
        population: co.population,
      })
    );
    return countries;
  });
}

module.exports = {
  GetCountries,
  GetCountriesOrdered,
  SearchCountries,
  GetCountryDetail,
  FilterCountries,
};
