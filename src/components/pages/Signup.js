import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../utils/api";

export default function Signup() {
    const [user, setUser] = useState({
        name: "",
        password: "",
        confirmPassword: "",
        email: "",
        role: "CLIENT",
        adminPassword: "-",
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
        <Main
            passwordBorder={
                passwordError ? "var(--error-color)" : "var(--accent-color)"
            }
        >
            <div></div>
            <form onSubmit={sendUser}>
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
                    <option value={"ADMIN"}>Admin</option>
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
            </form>
            <Link to="/signin">Já possui uma conta? Faça login!</Link>
        </Main>
    );
}

const Main = styled.main`
    background-color: var(--primary-color);

    div {
        width: 200px;
        height: 200px;
        background-color: black;
        margin: 20px 0px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    form input,
    form select {
        width: 317px;
        height: 40px;
        border-radius: 5px;
        padding: 5px;
        margin-bottom: 10px;
        border: 1px solid var(--accent-color);
        font-size: 18px;
        background-color: #ffffff;
    }

    form input:focus,
    form select:focus {
        outline: 2px solid var(--accent-color);
    }

    form input::placeholder {
        font-size: 16px;
    }

    form input.password {
        border: 1px solid ${(props) => props.passwordBorder};
    }

    form p {
        color: var(--error-color);
        font-weight: 700;
        margin-bottom: 10px;
    }

    button {
        width: 200px;
        height: 40px;
        background-color: var(--button-color);
        border: none;
        border-radius: 10px;
        font-size: 18px;
        margin: 15px 0px;
    }

    a {
        font-size: 18px;
    }
`;
