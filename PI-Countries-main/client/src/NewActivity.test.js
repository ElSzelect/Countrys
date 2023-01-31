import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {NewActivity} from "./components/NewActivity";

xtest('Activity Form testing',()=>{
  const countries = [{name:"Argentina",id:'ARG'}, {name:"Chile",id:'CHL'}]
  const component = render(<NewActivity props={countries}/>)
  //const button = component.getBy
  component.debug()
});