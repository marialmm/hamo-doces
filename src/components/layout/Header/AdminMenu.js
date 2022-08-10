import { useState } from "react";
import { GiCupcake, GiNotebook } from "react-icons/gi";
import {
    MdPhotoLibrary,
    MdKeyboardArrowDown,
    MdAddCircle,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function AdminMenu({ name }) {
    const [dropDownMenu, setDropDownMenu] = useState({
        product: false,
        gallery: false,
        orders: false,
    });

    const navigate = useNavigate();

    return (
        <ul>
            <p>Olá, {name}!</p>
            <Li>
                <div onClick={() => navigate("/products")}>
                    <GiCupcake />
                    <p>Produtos</p>
                </div>
                <MdKeyboardArrowDown
                    onClick={() => {
                        setDropDownMenu({
                            ...dropDownMenu,
                            product: !dropDownMenu.product,
                        });
                    }}
                />
                {dropDownMenu.product ? (
                    <div
                        onClick={() => {
                            navigate("/products/new");
                        }}
                    >
                        <MdAddCircle />
                        <p>Adicionar produto</p>
                    </div>
                ) : (
                    <></>
                )}
            </Li>
            <Li>
                <div onClick={() => navigate("/")}>
                    <MdPhotoLibrary />
                    <p>Galeria</p>
                </div>
                <MdKeyboardArrowDown
                    onClick={() => {
                        setDropDownMenu({
                            ...dropDownMenu,
                            gallery: !dropDownMenu.gallery,
                        });
                    }}
                />
                {dropDownMenu.gallery ? (
                    <div onClick={() => navigate("/gallery/new")}>
                        <MdAddCircle />
                        <p>Adicionar foto</p>
                    </div>
                ) : (
                    <></>
                )}
            </Li>
            <Li>
                <div onClick={() => navigate("/orders")}>
                    <GiNotebook />
                    <p>Encomendas</p>
                </div>
                <MdKeyboardArrowDown
                    onClick={() => {
                        setDropDownMenu({
                            ...dropDownMenu,
                            orders: !dropDownMenu.orders,
                        });
                    }}
                />
                {dropDownMenu.orders ? (
                    <div onClick={() => navigate("/orders/new")}>
                        <MdAddCircle />
                        <p>Adicionar encomenda</p>
                    </div>
                ) : (
                    <></>
                )}
            </Li>
        </ul>
    );
}

const Li = styled.li`
    justify-content: space-between;
    flex-wrap: wrap;

    div {
        display: flex;
        align-items: center;
        width: fit-content !important;
    }

    div:last-child {
        margin: 5px 15px;
    }

    div:last-child svg {
        font-size: 20px;
    }
`;
