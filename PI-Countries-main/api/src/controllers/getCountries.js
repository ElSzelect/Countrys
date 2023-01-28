const apiData = require("./getApiCountries");
const { Country, Activity } = require("../db");
const {Op, where} = require('sequelize');

const GetCountries = async () => {
  const db = await Country.findAll();
  return db;
};

const GetCountryById = async (id) => {
  const data = await GetCountries();
  const result = data.filter((country) => country.id === id.toUpperCase());
  if (result.length) {
    return result;
  }
  throw new Error(`No se encontro ningun pais con la ID ${id.toUpperCase()}`);
};

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

function FilterCountries(filter){
  let countries =[];
  return Activity.findOne({
    where:{name: filter},
    include: [{
      model: Country
    }]
  })
    .then(response => {response.countries.forEach(co => countries.push({
        name: co.name,
        flag: co.flag,
        continent: co.continent,
        id: co.id,
        population: co.population
      }));
      return countries;}
    )
}

module.exports = {
  GetCountries,
  GetCountriesOrdered,
  SearchCountries,
  GetCountryById,
  FilterCountries
};
