import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { api } from "../../utils/api";
import MainPage from "../layout/Signin-Signup/MainPage";

export default function Signup() {
    const [user, setUser] = useState({
        name: "",
        password: "",
        confirmPassword: "",
        email: "",
        role: "CLIENT",
        adminPassword: "",
    });
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    function sendUser(e) {
        e.preventDefault();
        if (user.confirmPassword !== user.password) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
        delete user.confirmPassword;

        if ((user.adminPassword.length = 0)) {
            user.adminPassword = "-";
        }

        const promise = api.post("/signup", user);
        promise.then(() => {
            navigate("/signin");
        });
        promise.catch((e) => {
            console.log(e);
            alert("Um erro aconteceu, tente novamente mais tarde");
        });
    }

    return (
        <MainPage>
            <h1>Cadastro</h1>
            <Form
                onSubmit={sendUser}
                passwordBorder={
                    passwordError ? "var(--error-color)" : "var(--accent-color)"
                }
            >
                <input
                    type="text"
                    placeholder="Nome"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                    required
                />
                <input
                    className="password"
                    type="password"
                    placeholder="Senha"
                    value={user.password}
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                    required
                />
                <input
                    className="password"
                    type="password"
                    placeholder="Confirme a senha"
                    value={user.confirmPassword}
                    onChange={(e) =>
                        setUser({ ...user, confirmPassword: e.target.value })
                    }
                    required
                />
                {passwordError ? <p>Senhas não coincidem</p> : <></>}
                <select
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                    required
                >
                    <option value={"CLIENT"}>Cliente</option>
                    <option value={"ADMIN"}>Administrador</option>
                </select>
                {user.role === "ADMIN" ? (
                    <input
                        type="password"
                        placeholder="Senha de administrador"
                        value={user.adminPassword}
                        onChange={(e) =>
                            setUser({ ...user, adminPassword: e.target.value })
                        }
                        required
                    />
                ) : (
                    <></>
                )}
                <button type="submit">Cadastrar</button>
            </Form>
            <Link to="/signin">Já possui uma conta? Faça login!</Link>
        </MainPage>
    );
}

const Form = styled.form`
    input.password {
        border: 1px solid ${(props) => props.passwordBorder};
    }

    p {
        color: var(--error-color);
        font-weight: 700;
        margin-bottom: 10px;
    }
`;
