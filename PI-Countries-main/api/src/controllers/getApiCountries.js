const axios = require("axios");
const { Country } = require("../db");

const apiData = async () => {
  try {
    const result = await axios.get("https://restcountries.com/v3/all");
    // const result = [
    //   {
    //     cca3: "ARG",
    //     name: { official: "Republica Argentina" },
    //     flags: [`google.com`, `ndafinasfif`],
    //     continents: ["SA"],
    //     capital: "BSAS",
    //     subregion: "asdnias",
    //     area: 643512,
    //     population: 876543,
    //   },
    // ];

    const newArr = result.data.map((elem) => {
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
  } catch (error) {
    return console.log("CAYO LA API CSM");
  }
};

const dbPayloader = async () => {
  Country.bulkCreate(await apiData()).then(() => {
    console.log("Se cargaron los paises a la db");
  });
};

module.exports = { apiData, dbPayloader };
