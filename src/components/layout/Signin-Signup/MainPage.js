import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function MainPage({ children }) {
    const navigate = useNavigate();
    return (
        <Main>
            <div onClick={() => navigate("/")}></div>
            {children}
        </Main>
    );
}

const Main = styled.main`
    min-height: 100vh;
    height: 100%;
    margin-top: 0px;
    align-items: center;
    justify-content: center;

    div {
        width: 180px;
        height: 180px;
        background-color: black;
        margin: 20px 0px;
    }

    h1 {
        font-size: 25px;
        font-weight: 700;
        margin-bottom: 10px;
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
