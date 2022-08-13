import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
    AiFillPlusCircle,
    AiTwotoneDelete,
    AiTwotoneEdit,
} from "react-icons/ai";

import { UserContext } from "../../assets/contexts/userContext";
import { api } from "../../utils/api";
import Header from "../layout/Header/Header";
import DeleteProductPopUp from "../layout/PopUp/DeleteProductPopUp";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [deletePopUp, setDeletePopUp] = useState({
        show: false,
        id: 0,
    });
    const [reload, setReload] = useState(true);

    const { header } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const promise = api.get("/products", header);
        promise.then((response) => {
            setProducts(response.data);
        });
        promise.catch((error) => {
            console.log(error.response);
            alert("Um erro aconteceu, tente novamente");
        });
    }, [reload]);

    function showDeletePopUp(id) {
        setDeletePopUp({
            id,
            show: true,
        });
    }

    return (
        <>
            <Header />
            <Main>
                <h2>Produtos</h2>
                {products.length === 0 ? (
                    <h3>Não há produtos cadastrados!</h3>
                ) : (
                    products.map((product) => (
                        <section key={product.id}>
                            <img
                                src={product.picture}
                                alt={product.name}
                                onClick={() =>
                                    navigate(`/products/${product.id}`)
                                }
                            />
                            <div
                                onClick={() =>
                                    navigate(`/products/${product.id}`)
                                }
                            >
                                <p>
                                    <span>{product.name}</span>
                                </p>
                                <p>
                                    <span>Preço:</span> {product.price}
                                </p>
                            </div>
                            <div>
                                <AiTwotoneDelete
                                    onClick={() => showDeletePopUp(product.id)}
                                />
                                <AiTwotoneEdit />
                            </div>
                        </section>
                    ))
                )}
                {deletePopUp.show ? (
                    <DeleteProductPopUp
                        popUp={deletePopUp}
                        setPopUp={setDeletePopUp}
                        reload={reload}
                        setReload={setReload}
                    />
                ) : (
                    <></>
                )}
            </Main>
        </>
    );
}

const Main = styled.main`
    h2 {
        width: 100%;
        text-align: center;
        font-size: 30px;
        font-weight: 600;
        margin: 10px 0;
    }

    h3 {
        font-size: 20px;
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }

    section {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 20px;
        padding: 5px;
        width: 90%;
        min-height: 75px;
        border: 1px solid var(--accent-color);
        cursor: pointer;
        position: relative;
    }

    section img {
        width: 40%;
        max-width: 300px;
    }

    section p {
        margin-left: 15px;
        font-size: 20px;
    }

    section p span {
        font-weight: 700;
    }

    section div:first-child {
        width: calc(60% - 70px);
    }

    section div:last-child {
        position: absolute;
        right: 15px;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    section div svg {
        color: var(--button-color);
        font-size: 28px;
        cursor: pointer;
    }
`;
