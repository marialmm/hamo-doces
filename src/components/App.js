import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GlobalStyle } from "../assets/globalStyles/GlobalStyles";
import Gallery from "./pages/Gallery";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

export default function App() {
    return (
        <BrowserRouter>
        <GlobalStyle />
                <Routes>
                    <Route path="/" element={<Gallery />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </BrowserRouter>
    );
}
