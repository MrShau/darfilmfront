import React from "react";
import { useContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Context } from ".";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Reg from "./pages/Reg/Reg";
import AdminUserTable from "./pages/Admin/User/Table/AdminUserTable";

import userApi from './api/UserApi'
import Header from "./components/Header/Header";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import FilmAddFilm from "./pages/Admin/Film/FilmAddFilm";
import Watch from "./pages/Watch/Watch";



const App = () => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  const [routes, setRoutes] = useState([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },

    {
      path: "/reg",
      element: <Reg />
    },

    {
      path: "/watch",
      element: <Watch />
    }
  ])


  if (loading) {
    userApi.Authentication().then(res => {
      if (res == null) {
        user.setIsAuth(false);
        user.setUser(null);
        user.setIsAdmin(false);
        localStorage.removeItem('token');
        if (!window.location.href.includes('/reg') && !window.location.href.includes('/login'))
          window.location.href = '/reg'
      }
      else {
        user.setIsAuth(true)
        user.setUser(res)
        if (user.user.role === "ADMIN")
          user.setIsAdmin(true)
        else
          user.setIsAdmin(false)

        if (user.isAdmin) {
          setRoutes(prev => [...prev, 
            {
              path: '/admin/user/table',
              element: <AdminUserTable />
            },
            {
              path: '/admin/film/add',
              element: <FilmAddFilm />
            }
          ])
        }

        userApi.addVisit();
      }
      setLoading(false)
    });

  }

  return (
    loading ?
      <Spinner animation="border" className="text-center" />
      :
      <React.StrictMode>
        <Header />
        <RouterProvider router={createBrowserRouter(routes)} />
      </React.StrictMode>
  )
}

export default App