// import { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { ModalProvider, Modal } from "../context/Modal";
// import { thunkAuthenticate } from "../redux/session";
// import Navigation from "../components/Navigation/Navigation";

// export default function Layout() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);
//   useEffect(() => {
//     dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
//   }, [dispatch]);

//   return (
//     <>
//       <ModalProvider>
//         <Navigation />
//         {isLoaded && <Outlet />}
//         <Modal />
//       </ModalProvider>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    // Skip authentication check for public routes
    const publicRoutes = ['/', '/signup', '/login'];
    if (!publicRoutes.includes(location.pathname)) {
      dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
    } else {
      setIsLoaded(true); 
    }
  }, [dispatch, location.pathname]);

  return (
    <>
      <ModalProvider>
        <Navigation />
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
}