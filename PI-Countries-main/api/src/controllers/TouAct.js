const { TouristActivity, Country } = require("../db");

const CreateActivity = async (
  name,
  difficulty,
  duration,
  season,
  countryId
) => {
  
  const newTouAct = await TouristActivity.create({
    name,
    difficulty,
    duration,
    season,
  });
  
  //Aca se registra en la tabla de relaciones
  let Countries = await Country.findAll({ where: { id: countryId }  });

  newTouAct.addCountry(Countries);

  return console.log("Activity Created!!");
};

const GetActivity = async () => await TouristActivity.findAll();

// function GetActivities(){
//   let activities = [];
//   return Activity.findAll()
//     .then(response => {
//       response.forEach(ac => activities.push(ac.name));
//       return activities;
//     })
// }

module.exports = { CreateActivity, GetActivity };
