import RestaurantCard from "./RestaurantCard";
import React, { useEffect, useState, useContext, createContext } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { list } from "postcss";
import UserContext from "../utils/UserContext";
import ReactSwitch from "react-switch";

export const ThemeContext = React.createContext(null);

const Body = () => {
  //local state variable- Super powerful variable
  const [ListOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [theme, setTheme] = useState("light");

  // console.log(ListOfRestaurants);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65420&lng=77.23730&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    setListOfRestaurant(json?.data?.cards[1]?.card?.card.gridElements.infoWithStyle.restaurants);
    setFilteredRestaurant(json?.data?.cards[1]?.card?.card.gridElements.infoWithStyle.restaurants);
  };
  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <h1>
        looks like you're offline!! Check your internrt connection;
      </h1>
    );

  const { loggedInUser, setUserName } = useContext(UserContext);

  return ListOfRestaurants.length === 0 ? (<Shimmer />) : (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="body" id={theme}>
        <div className="filter flex">
          <div className="search m-4 p-4">
            <input type="text" className="border border-solid border-black " value={searchText} onChange={(e) => {
              setsearchText(e.target.value)
            }} />
            <button className="px-4 py-2 bg-blue-200 m-4 rounded-lg" onClick={() => {

              const filteredRestaurant = ListOfRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
            >
              Search</button>
          </div>
          <div className="search m-4 p-4 flex items-center">
            <label>UserName :</label>
            <input className="border border-black p-2 "
              value={loggedInUser}
              onChange={(e) => setUserName(e.target.value)}></input>
          </div>
          <div className="switch p-4 m-8 flex item-center">
              <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
              <ReactSwitch onChange={toggleTheme} checked = {theme === "dark"}/>
            </div>
        </div>
        <div className="flex flex-wrap p-12">
          {
            filteredRestaurant.map((restaurant) => {
              return (
                <Link
                  key={restaurant.info.id}
                  to={"/restaurants/" + restaurant.info.id}>
                  <RestaurantCard resData={restaurant} /></Link>
              )
            }
            )
          }
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
export default Body;