import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {

  const [btnNameReact, setBtnNameReact] = useState("Login");

  const onlineStatus = useOnlineStatus();
  
  const {loggedInUser} = useContext(UserContext);
  // subscribing to the store using a selector
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between bg-pink-200 shadow-lg sm:bg-yellow-100 lg:bg-blue-200">
      <div className="logo-container">
        <img className="w-40" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">
            Online Status: {onlineStatus ? "🟢" : "🔴"}
          </li>
          <li className="px-4 border-solid border-2 border-black">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4 border-solid border-2 border-black">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4 border-solid border-2 border-black">
            <Link to="/contact">contact Us</Link>
          </li>
          <li className="px-4 font-bold text-xl border-solid border-2 border-black">
          <Link to="/cart">
          Cart({cartItems.length})</Link></li>
          <button className="Login-button px-4 border-solid border-2 border-black" onClick={() => {
            btnNameReact === "Login" ? setBtnNameReact("Logout") : setBtnNameReact("Login");
          }}
          >
            {btnNameReact}
          </button>
          <li className="px-4 font-bold">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;