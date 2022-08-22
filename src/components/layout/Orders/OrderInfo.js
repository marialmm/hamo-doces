import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";
import { EditText } from "react-edit-text";

import { UserContext } from "../../../assets/contexts/userContext";
import { api } from "../../../utils/api";

export default function OrderInfo({ orderInfo, setOrderInfo }) {
    const { id, show } = orderInfo;
    const [order, setOrder] = useState({});

    const { header } = useContext(UserContext);
    const status = {
        accepted: "Aceita",
        making: "Fazendo",
        delivered: "Entregue",
    };

    useEffect(() => {
        const promise = api.get(`/orders/${id}`, header);
        promise.then((response) => {
            setOrder(response.data);
        });
        promise.catch((e) => {
            console.log(e.response);
            alert("Um erro aconteceu, tente novamente!");
        });
    }, []);

    function closeModal() {
        setOrderInfo({
            id: 0,
            show: false,
        });
    }

    return (
        <Modal isOpen={show} onRequestClose={closeModal} style={customStyles}>
            {Object.keys(order).length > 0 ? (
                <Section>
                    <div>
                        <span>Cliente: </span>
                        <EditText defaultValue={" " + order.clientName} />
                    </div>
                    <div>
                        <span>Data de entrega: </span>
                        {order.deliveryDate}
                    </div>
                    <div>
                        <span>Valor total: </span>
                        {order.totalPrice}
                    </div>
                    <div>
                        <span>Total pago: </span>
                        {order.amountPaid}
                    </div>
                    <div>
                        <span>Tema: </span>
                        {order.theme.name}
                    </div>
                    <div>
                        <span>Status: </span>
                        {status[order.status]}
                    </div>
                    <div>
                        <span>Produtos: </span>
                    </div>
                    <ul>
                        {order.products.map((product) => (
                            <ul>
                                <li>
                                    <span>Produto: </span>
                                    {product.name}
                                </li>
                                <li>
                                    <span>Quantidade: </span>
                                    {product.quantity}
                                </li>
                                <li>
                                    <span>Preço Unitário: </span>
                                    {product.priceUnit}
                                </li>
                                {product.flavor ? (
                                    <li>
                                        <span>Sabor: </span>
                                        {product.flavor}
                                    </li>
                                ) : (
                                    <></>
                                )}
                            </ul>
                        ))}
                    </ul>
                    <AiFillCloseCircle onClick={closeModal} />
                </Section>
            ) : (
                <></>
            )}
        </Modal>
    );
}

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > div {
        display: flex;
    }

    div,
    li {
        font-size: 18px;
        line-height: 24px;
    }

    span {
        font-weight: 700;
    }

    ul ul {
        margin-left: 15px;
    }

    svg {
        color: var(--accent-color);
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 25px;
    }
`;

const customStyles = {
    overlay: {
        backgroundColor: " #00000052",
        zIndex: 1,
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        backgroundColor: "var(--secondary-color)",
    },
};
