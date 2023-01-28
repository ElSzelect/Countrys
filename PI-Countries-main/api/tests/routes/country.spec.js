/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country,Activity, conn } = require('../../src/db.js');

const agent = session(app);
const countries = [
  {id: 'ARG',name: 'Argentina',continent: 'America',population:123456,area:1234,
  capital: 'Buenos Aires', flag: 'https://restcountries.com/data/png/arg.png'},
  {id: 'NOR',name: 'Norway',continent: 'Europe',population:12345,area:123,
  capital: 'Oslo', flag: 'https://restcountries.com/data/png/nor.png'},
  {id: 'CHI',name: 'Chile',continent: 'America',population:2345,area:123,
  capital: 'Santiago de Chile', flag: 'https://restcountries.com/data/png/chi.png'}
  ];
const activity1 = {name:'running', duration:1,difficulty:2,countryId:['ARG','NOR'],season:'spring'}
const activity2 = {name:'sightseeing', duration:2,difficulty:1,countryId:['NOR'],season:'spring'}

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => countries.forEach(c=>Country.create(c))));
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
  describe('GET /country', () => {
    it('should get an array of the created countries', () =>
      agent.get('/countries')
      .then(response => {
        expect(response.body.length).to.equal(3);
        expect(response.body[0].name).to.exist;
        expect(response.body[1].id).to.exist;
        expect(response.body[2].continent).to.exist;
      })
      .catch((err) => {console.log('Error: ',err)})
    );
    it('should filter countries by activity sent by query',()=>{
      before(() =>Country.sync({ force: true })
        .then(() => countries.forEach(c => Country.create(c)))
        .then(() => agent.post('/activity').send(activity1)))
        agent.get('/countries?filter='+activity1.name)
        .then(response => {
          //console.log('b',response.body)
          expect(response.body.length).to.equal(2)
        })
    })
  });
});
describe('Activity routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => countries.forEach(c=>Country.create(c))));
  beforeEach(() => Activity.sync({ force: true }))
  describe('GET /activity', () => {
    it('should get 200', () =>
      agent.get('/activity').expect(200)
    );
  });
  describe('POST /activity', () => {
    it('should post an activity and get 200', () =>
      agent.post('/activity').send(activity1)
      .then((r)=> expect(r.status).to.equal(200))
    );
    it('should get a list of activities created', () =>
      agent.post('/activity').send(activity1)
      .then(() => agent.post('/activity').send(activity2))
      .then(()=>agent.get('/activity'))
      .then(re => {
        expect(re.body.length).to.equal(2);
        expect(re.body[0]).to.equal(activity1.name);
        expect(re.body[1]).to.equal(activity2.name);
      })
    );
  });

});