const axios = require("axios");
const { Country } = require("../db");

const apiData = async () => {
  const result = await axios.get("https://restcountries.com/v3/all");

  const newArr = result.data.map((elem) => {
    // console.log(elem);
    return {
      id: `${elem.cca3}`,
      name: elem.name.official,
      flag: elem.flags[1],
      continent: elem.continents.join(" "),
      capital: `${elem.capital}`,
      subregion: elem.subregion,
      area: `${Math.round(elem.area)}`,
      population: elem.population,
    };
  });
  //   console.log(newArr);
  return newArr;
};

const dbPayloader = async () => {
  Country.bulkCreate(await apiData()).then(() => {
    console.log("Se cargaron los paises a la db");
  });
};

console.log(apiData());

module.exports = { apiData, dbPayloader };
