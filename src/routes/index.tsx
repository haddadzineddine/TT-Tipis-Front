import { createBrowserRouter } from "react-router-dom";
import { CartHistory } from "../features/cart/components/CartHistory";
import { App } from "../App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/cart-history",
        element: <CartHistory />,
    }
]);