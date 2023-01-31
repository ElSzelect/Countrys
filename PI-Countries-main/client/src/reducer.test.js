import rootReducer from "./reducer";
import {setPage} from "./actions";
//import expect from 'expect';


const initialState = {
  countries: [],
  selectedCountry:{activities:[]},
  currentPage:1,
  activityList:[],
  resultCountries:[]
};

describe('reducer', ()=> {
  it('it should return the initial state', () => {
    expect(rootReducer(undefined, [])).toEqual(initialState);
  });
  it('it should set the page number to the value sent as payload', () => {
    expect(rootReducer(initialState, setPage(4))).toEqual({
      ...initialState,
      currentPage: 4
    });
  });
  //it('')

});