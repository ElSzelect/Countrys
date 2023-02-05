import axios from "axios";
import { COUNTRIES_URL, ACTIVITY_URL } from "../constants";

export function getCountries() {
  return function (dispatch) {
    return axios.get(`${COUNTRIES_URL}`).then((result) =>
      dispatch({
        type: "GET_COUNTRIES",
        payload: result.data,
      })
    );
  };
}
export function getActivities() {
  return function (dispatch) {
    return axios.get(`${ACTIVITY_URL}`).then((result) =>
      dispatch({
        type: "GET_ACTIVITIES",
        payload: result.data,
      })
    );
  };
}
export function getCountryDetail(id) {
  return function (dispatch) {
    return axios.get(`${COUNTRIES_URL}/${id}`).then((result) =>
      dispatch({
        type: "GET_COUNTRY_DETAIL",
        payload: result.data,
      })
    );
  };
}
export function getCountriesOrdered(order, param) {
  return function (dispatch) {
    return axios
      .get(`${COUNTRIES_URL}?order=${order}&param=${param}`)
      .then((result) =>
        dispatch({
          type: "GET_COUNTRIES_ORDERED",
          payload: result.data,
        })
      );
  };
}
export function clearCountryDetail() {
  return function (dispatch) {
    dispatch({
      type: "CLEAR_COUNTRY_DETAIL",
      payload: {
        flag: "https://1.bp.blogspot.com/-tM8Z7VPNn5Q/WMkr9sb6qyI/AAAAAAAAA9s/IjGPg8VFOkc41UWeaWuGY7eyJeCCEb82gCLcB/s1600/earth%2B.gif",
        activities: [],
      },
    });
  };
}
export function clearResultCountries() {
  return function (dispatch) {
    dispatch({
      type: "CLEAR_RESULT_COUNTRY",
      payload: [],
    });
  };
}
export function searchCountry(name) {
  return function (dispatch) {
    return axios.get(`${COUNTRIES_URL}?name=${name}`).then((result) => {
      if (Array.isArray(result.data))
        dispatch({
          type: "SEARCH_COUNTRY",
          payload: result.data,
        });
      else {
        alert(result.data.message);
        dispatch({ type: "SEARCH_COUNTRY", payload: [] });
      }
    });
  };
}

export function addActivity(activity) {
  return function (dispatch) {
    return axios.post(ACTIVITY_URL, activity).then((result) => {
      alert(`${activity.name} created successfuly!!`);
      dispatch({
        type: "ADD_ACTIVITY",
        payload: activity.name,
      });
    });
  };
}


export function filterCountry(activity) {
  return function (dispatch) {
    axios.get(`${COUNTRIES_URL}?filter=${activity}`).then((result) =>
      dispatch({
        type: "FILTER_COUNTRY",
        payload: result.data,
      })
    );
  };
}


export function frontFilter(continent) {
  return function (dispatch) {
    dispatch({ type: "FRONT_FILTER", payload: continent });
  };
}


export function frontOrder(parameters) {
  switch (parameters) {
    case "abc":
      return function (dispatch) {
        dispatch({
          type: "FRONT_ORDER",
          payload: function (a, b) {
            return a.name.localeCompare(b.name);
          },
        });
      };
    case "zyx":
      return function (dispatch) {
        dispatch({
          type: "FRONT_ORDER",
          payload: function (a, b) {
            return b.name.localeCompare(a.name);
          },
        });
      };
    case "pAsc":
      return function (dispatch) {
        dispatch({
          type: "FRONT_ORDER",
          payload: function (a, b) {
            if (a.population < b.population) return -1;
            if (a.population > b.population) return 1;
            return 0;
          },
        });
      };
    case "pDesc":
      return function (dispatch) {
        dispatch({
          type: "FRONT_ORDER",
          payload: function (a, b) {
            if (a.population > b.population) return -1;
            if (a.population < b.population) return 1;
            return 0;
          },
        });
      };
    default:
      break;
  }
}

export function setPage(newPage) {
  return function (dispatch) {
    dispatch({
      type: "SET_PAGE",
      payload: newPage,
    });
  };
}
