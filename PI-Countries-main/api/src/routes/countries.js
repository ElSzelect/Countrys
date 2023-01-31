const { Router } = require("express");
const {
  GetCountriesOrdered,
  GetCountries,
  GetCountryDetail,
  SearchCountries,
  FilterCountries,
} = require("../controllers/getCountries");



// [ ] GET /countries:
// En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
// Obtener un listado de los paises.
// [ ] GET /countries/{idPais}:
// Obtener el detalle de un país en particular
// Debe traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes
// [ ] GET /countries?name="...":
// Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
// Si no existe ningún país mostrar un mensaje adecuado

//El codigo 304 indica que no hubo necesidad de retransmitir los datos solicitados

const countries = Router();

countries.get("/", (req, res, next) => {
  let { name, param, order, filter } = req.query;
  if (name) {
    SearchCountries(name)
      .then((countries) => res.json(countries))
      .catch((err) => next(err));
  } else if (param && order) {
    GetCountriesOrdered(order, param)
      .then((countries) => res.json(countries))
      .catch((err) => next(err));
  } else if (filter) {
    FilterCountries(filter)
      .then((countries) => res.json(countries))
      .catch((err) => next(err));
  } else {
    GetCountries()
      .then((countries) => res.json(countries))
      .catch((err) => next(err));
  }
});

countries.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await GetCountryDetail(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).send(error.message);
  }
});



module.exports = { countries };