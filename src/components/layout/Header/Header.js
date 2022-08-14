import styled from "styled-components";
import { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdLogout, MdLogin } from "react-icons/md";

import Menu from "./Menu/Menu";
import { UserContext } from "../../../assets/contexts/userContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [menu, setMenu] = useState(false);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <Container>
            <AiOutlineMenu onClick={() => setMenu(true)} />
            <h1 onClick={() => navigate("/")}>Hamo Doces</h1>
            {user ? (
                <MdLogout />
            ) : (
                <MdLogin onClick={() => navigate("/signin")} />
            )}
            {menu ? <Menu setMenu={setMenu} /> : <></>}
        </Container>
    );
}

const Container = styled.header`
    background-color: var(--secondary-color);
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;

    svg {
        margin: 0 10px;
        font-size: 40px;
        color: var(--accent-color);
        cursor: pointer;
    }

    h1 {
        font-size: 40px;
        font-weight: 700;
        font-family: var(--font-family-logo);
        cursor: pointer;
    }
`;
