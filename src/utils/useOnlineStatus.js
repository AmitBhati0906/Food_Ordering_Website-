import { useEffect, useState } from "react";

const useOnlineStatus = () => {

  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlineStatus(false);
    });
  }, []);


  //boolean Value
  return onlineStatus;
};
export default useOnlineStatus;