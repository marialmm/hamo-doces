import styled from "styled-components";
import Header from "./Header/Header";

export default function New({ children }) {
    return (
        <>
            <Header />
            <Main>{children}</Main>
        </>
    );
}

const Main = styled.main`
    padding: 20px;
    align-items: center;

    h2 {
        font-size: 25px;
        font-weight: 700;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 100%;
        margin-top: 15px;
    }

    form input,
    form select,
    form textarea {
        max-width: 90%;
        width: 317px;
        height: 40px;
        border-radius: 5px;
        padding: 5px;
        margin-bottom: 10px;
        border: 1px solid var(--accent-color);
        font-size: 18px;
        background-color: #ffffff;
    }

    form textarea {
        height: 80px;
    }

    form label {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 90%;
    }

    form label input {
        width: 20px;
        height: 20px;
        margin: 0px 5px 0 0;
    }

    form input:focus,
    form select:focus,
    form textarea:focus {
        outline: 2px solid var(--accent-color);
    }

    form input::placeholder,
    form textarea::placeholder {
        font-size: 16px;
    }

    button {
        width: 200px;
        max-width: 80%;
        height: 40px;
        background-color: var(--button-color);
        border: none;
        border-radius: 10px;
        font-size: 18px;
        margin: 15px 0px;
    }
`;
