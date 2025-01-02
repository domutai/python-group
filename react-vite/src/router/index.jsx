import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import CartPage from "../components/Cart";
import Layout from "./Layout";
import ProductDetails from '../components/Products/ProductDetails';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />
      },
      {
        path: "*",
        element: <Navigate to='/' />
      }
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
]);
