import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "../assets/contexts/userContext";

import { GlobalStyle } from "../assets/globalStyles/GlobalStyles";
import Gallery from "./pages/Gallery";
import NewOrder from "./pages/NewOrder";
import NewPicture from "./pages/NewPicture";
import NewProduct from "./pages/NewProduct";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <UserProvider>
                <Routes>
                    <Route path="/" element={<Gallery />} />
                    <Route
                        path="/gallery/new"
                        element={
                            <PrivateRoute role="ADMIN">
                                <NewPicture />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route
                        path="/orders/new"
                        element={
                            <PrivateRoute role="ADMIN">
                                <NewOrder />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/products"
                        element={
                            <PrivateRoute>
                                <Products />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/products/new"
                        element={
                            <PrivateRoute role="ADMIN">
                                <NewProduct />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}
