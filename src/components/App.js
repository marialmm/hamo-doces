import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "../assets/contexts/userContext";

import { GlobalStyle } from "../assets/globalStyles/GlobalStyles";
import Gallery from "./pages/Gallery";
import NewPicture from "./pages/NewPicture";
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
                    <Route path="/products" element={<Products />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}
