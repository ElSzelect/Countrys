import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from './App';

test('App should render LandingPage component', () => {
  render(<App />);
  const titleElement = screen.getByText(/COUNTR/);
  expect(titleElement).toBeInTheDocument();
  const imgToEnterApp = screen.getByAltText('home')
  expect(imgToEnterApp).toBeInTheDocument();

});


// import React from 'react';
// import { render as rRender} from '@testing-library/react';
// import { configureStore } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';
// import '@testing-library/jest-dom/extend-expect';
// import rootReducer from "./reducer";
// import App from "./App";
//
// function render(
//   ui,
//   {
//     preloadedState,
//     store = configureStore({ rootReducer: { user: userReducer }, preloadedState }),
//     ...renderOptions
//   } = {}
// ) {
//   function Wrapper({ children }) {
//     return <Provider store={store}>{children}</Provider>
//   }
//   return rRender(ui, { wrapper: Wrapper, ...renderOptions })
// }
//
// // re-export everything
// export * from '@testing-library/react'
// // override render method
// export { render }




// test('Test about App', () => {
// const { getByText } = render(<App />);
//  const linkElement = getByText(/COUNTRIES/);
// expect(linkElement).toBeInTheDocument();
//   const component = render(<App/>);
// console.log(component.getByText(/COUNTRIES/))
//   expect(component.getByText(/COUNTRIES/)).toBeInTheDocument();
// });