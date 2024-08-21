import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const placeholderImageURL = "https://media-assets.swiggy.com/swiggy/image/upload/dls-web/assets/images/placeholder-light.png"; // Placeholder URL


  const {name, cuisines, avgRating, costForTwo, } = resData.info;

  return (
    <div className=" main m-4 p-4 w-[250px] h-[500px] rounded-lg">
      <img
        className="rounded-lg w-[250px] h-[250px]"
        alt="Image"
        src={CDN_URL + resData.info.cloudinaryImageId}
        onError={(e) => {
          e.target.src = placeholderImageURL; // Replace with placeholder URL if image fails to load
        }}
      ></img>
      <h3 className="font-bold py-4 text-lg text-blue-800">{name}</h3>
      <h4>{cuisines[1]}</h4>
      <h4>{avgRating}⭐Stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{resData.info.sla.deliveryTime} minutes</h4>
    </div>
  );
};

export default RestaurantCard;
