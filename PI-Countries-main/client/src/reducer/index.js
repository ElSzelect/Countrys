const initialState = {
  countries: [],
  selectedCountry:{activities:[]}, 
  currentPage:1,
  activityList:[],
  resultCountries:[]
}

function rootReducer(state = initialState,action){
  switch (action.type){
    case 'GET_COUNTRIES':
      return {
        ...state,
        countries: action.payload
      }
    case 'GET_ACTIVITIES':
      return {
        ...state,
        activityList: action.payload
      }
    case 'GET_COUNTRY_DETAIL':
      return {
        ...state,
        selectedCountry: action.payload
      }
    case 'CLEAR_COUNTRY_DETAIL':
      return {
        ...state,
        selectedCountry: action.payload
      }
    case 'SEARCH_COUNTRY':
      return {
        ...state,
        resultCountries: action.payload
      }
    case 'CLEAR_RESULT_COUNTRY':
      return {
      ...state,
      resultCountries: action.payload
    }
    case 'ADD_ACTIVITY':
      return {
        ...state,
        activityList: [...state.activityList,action.payload]
      }
    case 'GET_COUNTRIES_ORDERED':
      return {
        ...state,
        resultCountries: action.payload
      }
    case 'FILTER_COUNTRY':
      return {
        ...state,
        resultCountries: action.payload
      }
    case 'FRONT_FILTER':
      return {
        ...state,
        resultCountries: [...state.countries].filter(c => c.continent === action.payload)
      }
    case 'FRONT_ORDER':
      return {
        ...state,
        resultCountries: [...state.resultCountries].sort(action.payload)
      }
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
export default rootReducer;