import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
    AiFillPlusCircle,
    AiTwotoneDelete,
    AiTwotoneEdit,
} from "react-icons/ai";

import { UserContext } from "../../assets/contexts/userContext";
import { api } from "../../utils/api";
import Header from "../layout/Header/Header";

export default function Orders() {
    const [orders, setOrders] = useState([]);

    const { header } = useContext(UserContext);

    const status = {
        accepted: "Aceita",
        making: "Fazendo",
        delivered: "Entregue",
    };

    useEffect(() => {
        const promise = api.get("/orders", header);
        promise.then((response) => {
            setOrders(response.data);
        });
        promise.catch((e) => {
            console.log(e);
            alert("Um erro aconteceu, tente novamente!");
        });
    }, []);

    return (
        <>
            <Header />
            <Main>
                <h2>Encomendas</h2>
                {orders.length > 0 ? (
                    orders.map((order) => {
                        return (
                            <>
                                <section>
                                    <p>
                                        <span>Cliente: </span>
                                        {order.clientName}
                                    </p>
                                    <p>
                                        <span>Data de entrega: </span>
                                        {order.deliveryDate}
                                    </p>
                                    <p>
                                        <span>Preço total: </span>
                                        {order.totalPrice}
                                    </p>
                                    <p>
                                        <span>Status: </span>
                                        {status[order.status]}
                                    </p>
                                    <p>
                                        <span>Produtos:</span>
                                    </p>
                                    <ul>
                                        {order.products.map((product) => (
                                            <li>{product.name}</li>
                                        ))}
                                    </ul>
                                </section>
                                <div>
                                    <AiTwotoneEdit />
                                </div>
                            </>
                        );
                    })
                ) : (
                    <h3>Não há encomendas cadastradas!</h3>
                )}
            </Main>
        </>
    );
}

const Main = styled.main`
    flex-direction: row;
    flex-wrap: wrap;

    h2 {
        width: 100%;
        text-align: center;
        font-size: 30px;
        font-weight: 600;
        margin: 10px 0;
    }

    h3{
        width: 100%;
        text-align: center;
        font-size: 25px;
        margin: 10px 0;
    }

    section {
        border: 1px solid var(--accent-color);
        margin: 10px;
        padding: 10px;
        min-height: 175px;
        width: 250px;
    }

    section p,
    section ul li {
        font-size: 18px;
        line-height: 25px;
    }

    section p span {
        font-weight: 700;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 5px 0px 0px;
        justify-content: space-between;
    }

    div svg {
        color: var(--button-color);
        font-size: 28px;
        cursor: pointer;
    }
`;
