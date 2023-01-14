import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Statistics } from './screens'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      
    ],
    
  },
  {
    path: "statistics",
    element: <Statistics />,
  },
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
