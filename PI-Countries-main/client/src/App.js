import './App.css';
import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import Home  from './components/Home';
import CountryDetail from './components/CountryDetail';
import LandingPage from './components/LandingPage'
import NewActivity from "./components/NewActivity";
// import store from "./store";
// import {Provider} from 'react-redux';

export default function App() {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/activity" component={NewActivity}/>
        <Route exact path="/country/:id" component={CountryDetail}/>
      </div>
    </BrowserRouter>
  // </Provider>
  );
}
