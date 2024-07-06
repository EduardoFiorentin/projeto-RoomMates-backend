import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

import Root from "./routes/root";
import LoginScreen from './routes/LoginScreen/LoginScreen';
import Expenses from './routes/Expenses/Expenses';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },

  {
    path: "/login",
    element: <LoginScreen/>
  },

  {
    path: "/expenses",
    element: <Expenses/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
