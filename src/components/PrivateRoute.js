import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../assets/contexts/userContext";

export default function PrivateRoute({ children, role }) {
    const { user } = useContext(UserContext);

    if (!user) {
        alert(
            "Você não está logado! Entre na sua conta ou cadastre-se para acessar!"
        );
        return <Navigate to="/signin" />;
    }

    if (role && user.role !== role) {
        alert("Você não tem autorização para acessar!");
        return <Navigate to="/" />;
    }

    return children;
}
