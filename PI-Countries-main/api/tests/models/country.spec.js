const { Country,Activity, conn } = require('../../src/db.js');
const { expect } = require('chai');

const countries = [
  {id: 'ARG',name: 'Argentina',continent: 'America',
  capital: 'Buenos Aires', flag: 'https://restcountries.com/data/png/arg.png'},
  {id: 'NOR',name: 'Norway',continent: 'Europe',
  capital: 'Oslo', flag: 'https://restcountries.com/data/png/nor.png'}
  ];

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({capital:'Buenos Aires', continent: 'America', flag:'https://restcountries.com/data/png/arg.png',id:'ARG'})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', (done) => {
        Country.create({name:'Argentina',capital:'Buenos Aires', continent: 'Americas', flag:'https://www.google.com',id:'ARG'})
        .then(() => done())
        .catch(() => done(new Error('This should not happen because the name is valid')));
      });
    });
    describe('flag',() => {
      it('should throw an error if flag is null', (done) => {
        Country.create({name: 'Argentina',capital:'Buenos Aires', continent: 'Americas', id:'ARG'})
          .then(() => done(new Error('It requires a flag')))
          .catch(() => done());
      });
      it('should throw an error when the flag is not a url', (done) => {
        Country.create({name: 'Argentina',capital:'Buenos Aires', continent: 'Americas', id:'ARG', flag:'flag_arg.png'})
        .then(() => done(new Error('The flag must be a url')))
        .catch(() => done());
      });
    });
  });
});
describe('Activity model', () => {  
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Activity.sync({ force: true }));
  describe('creating activities', () => {
      it('should not create an activity if name is null', (done) => {
        Activity.create({id:1,difficulty:3, duration:2, season:'summer'})
          .then(() => done(new Error('name is missing')))
          .catch(() => done());
      });
      it('should throw an error if season is not equal to summer,spring,fall or winter', (done) => {
        Activity.create({id:2,name:'trekking',difficulty:3, duration:2, season:'sumer'})
          .then(() => done(new Error('season name is not valid')))
          .catch(() => done());
      });
      it('should throw an error if difficulty is not between 1 and 5', (done) => {
        Activity.create({id:3, name:'running',difficulty:6, duration:2, season:'summer'})
          .then(() => new Error('difficulty value is incorrect'))
          .catch(() => done());
      });
      it('should create an activity if all parameters are valid',(done)=>{
        Activity.create({id:4, name:'running',difficulty:2, duration:2, season:'spring'})
        .then(() => Activity.findAll())
        .then(results => (results.length===1)?done():new Error('wrong'))//expect(results.length).to.be.equal(1)) //what?
        //.catch(() => console.log('it did not work'))
      });
    });
  });