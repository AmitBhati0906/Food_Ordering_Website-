import React, {lazy, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
// import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./utils/Cart";
// import Grocery from "./components/Grocery";

//lazy loading 
// or we can say Dynamic loading

const Grocery = lazy(()=>import("./components/Grocery"));
const About = lazy(()=>import("./components/About"));

const Applayout = () => {
  
  const [UserName, setUserName] = useState();

  useEffect(() => {
    const data = {
      name: "Amit Bhati",
    };
    setUserName(data.name);
  }, []);
  
  return  (
    <Provider store={appStore}>
    <UserContext.Provider value={{ loggedInUser: UserName, setUserName}}>
    <div className="app">
      <Header/>
      <Outlet/>
    </div>
    </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Applayout/>,
    children: [
      {
        path: "/",
        element: <Body/>
      },
      {
        path: "/about",
        element: <Suspense fallback ={<h1>Loading...</h1>}> <About /></Suspense>,
      }, 
      {
        path: "/contact",
        element: <Contact />
      }, 
      {
        path: "/grocery",
        element: <Suspense fallback ={<h1>Loading...</h1>}> <Grocery /></Suspense>,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />
      },
      {
        path: "/cart",
        element: <Cart />,
      }
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);