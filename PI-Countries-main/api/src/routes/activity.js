const { Router } = require("express");
const activity = Router();
const { CreateActivity, GetActivity } = require("../controllers/TouAct");

activity.get("/", async (req, res) => {
  try {
    const data = await GetActivity();
    res.status(200).send(data);
  } catch (error) {
    res.status("400").send(error.message);
  }
});

activity.post("/", async (req, res) => {
  try {
    const { name, difficulty, duration, season } = req.body;
    const activity = await CreateActivity(name, difficulty, duration, season);
    res.status(200).send(activity);
  } catch (error) {
    res.status("400").json(error.message);
  }
});

module.exports = { activity };
