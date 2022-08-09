import ClickAwayListener from "@mui/base/ClickAwayListener";
import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../assets/contexts/userContext";
import AdminMenu from "./AdminMenu";
import ClientMenu from "./ClientMenu";
import GenericMenu from "./GenericMenu";

export default function Menu({ setMenu }) {
    const { user } = useContext(UserContext);
    
    function showMenu() {
        if (!user) {
            return <GenericMenu />;
        }
        if (user.role === "ADMIN") {
            return <AdminMenu name={user.name} />;
        }
        if (user.role === "CLIENT") {
            return <ClientMenu name={user.name} />;
        }
    }

    return (
        <Container>
            <ClickAwayListener onClickAway={() => setMenu(false)}>
                <aside>{showMenu()}</aside>
            </ClickAwayListener>
            <div></div>
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    top: 70px;
    width: 100%;
    height: calc(100vh - 70px);
    background-color: #00000052;

    aside {
        width: 50%;
        max-width: 250px;
        height: 100%;
        background-color: var(--accent-color);
    }

    aside ul {
        padding-top: 15px;
    }

    aside ul > p {
        color: #ffffff;
        font-size: 20px;
        font-weight: 700;
        margin-left: 15px;
    }

    aside ul li {
        display: flex;
        align-items: center;
        margin-top: 10px;
        cursor: pointer;
    }

    aside ul li svg {
        color: #ffffff;
        margin-right: 15px;
        font-size: 35px;
    }

    aside ul li p {
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
    }

    div {
        width: 50%;
    }
`;
