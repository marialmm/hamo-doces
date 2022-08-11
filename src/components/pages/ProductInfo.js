import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IoArrowBackCircle } from "react-icons/io5";

import { UserContext } from "../../assets/contexts/userContext";
import { api } from "../../utils/api";
import Header from "../layout/Header/Header";

export default function ProductInfo() {
    const [product, setProduct] = useState({});

    const { user, header } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const promise = api.get(`/products/${id}`, header);
        promise.then((response) => {
            setProduct(response.data);
        });
        promise.catch((e) => {
            console.log(e.response);
            alert("Um erro aconteceu, tente novamente!");
            navigate("/products");
        });
    }, []);

    return (
        <>
            <Header />
            <Main>
                {Object.keys(product).length > 0 ? (
                    <>
                        <h2>{product.name}</h2>
                        <p>
                            <span>Descrição: </span>
                            {product.description}
                        </p>
                        <p>
                            <span>Preço: </span>
                            {product.price}
                        </p>
                        <p>
                            <span>Fotos</span>
                        </p>
                        <section>
                            {product.picture.map((picture) => (
                                <img
                                    key={picture.id}
                                    src={picture.pictureUrl}
                                />
                            ))}
                        </section>
                    </>
                ) : (
                    <></>
                )}
                <IoArrowBackCircle onClick={() => navigate(-1)} />
            </Main>
        </>
    );
}

const Main = styled.main`
    padding: 20px;

    h2 {
        font-size: 25px;
        font-weight: 700;
        line-height: 40px;
    }

    p {
        font-size: 18px;
        line-height: 25px;
    }

    p span {
        font-weight: 600;
    }

    section {
        display: flex;
        flex-wrap: wrap;
    }

    section img {
        width: 50%;
    }

    svg {
        cursor: pointer;
        position: absolute;
        bottom: 20px;
        font-size: 40px;
        color: var(--button-color);
    }
`;
