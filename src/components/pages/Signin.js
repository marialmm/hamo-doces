import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../../assets/contexts/userContext";
import { api } from "../../utils/api";
import MainPage from "../layout/Signin-Signup/MainPage";

export default function Signin() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    function sendUserData(e) {
        e.preventDefault();
        const promise = api.post("/signin", userData);
        promise.then((response) => {
            setUser(response.data);
            navigate("/");
        });
        promise.catch((e) => {
            console.log(e);
            alert("Um erro aconteceu, tente novamente");
        });
    }

    return (
        <MainPage>
            <h1>Login</h1>
            <form onSubmit={sendUserData}>
                <input
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                    }
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={userData.password}
                    onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                    }
                    required
                />
                <button type="submit">Entrar</button>
            </form>
            <Link to="/signup">Não possui uma conta? Cadastre-se!</Link>
        </MainPage>
    );
}
