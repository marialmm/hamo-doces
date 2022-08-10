import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../assets/contexts/userContext";
import { api } from "../../utils/api";
import Header from "../layout/Header/Header";

export default function Products() {
    const [products, setProducts] = useState([]);

    const { header } = useContext(UserContext);

    useEffect(() => {
        const promise = api.get("/products", header);
        promise.then((response) => {
            setProducts(response.data);
        });
        promise.catch((error) => {
            console.log(error.response);
        });
    }, []);

    return (
        <>
            <Header />
            <Main>
                <h2>Produtos</h2>
                {products.length === 0 ? (
                    <h3>Não há produtos cadastrados!</h3>
                ) : (
                    products.map((product) => (
                        <>
                            <section>
                                <img src={product.picture} />
                                <div>
                                    <p><span>{product.name}</span></p>
                                    <p><span>Preço:</span> {product.price}</p>
                                </div>
                            </section>
                        </>
                    ))
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
        border: 1px solid var(--accent-color)
    }

    section img {
        width: 40%;
        max-width: 300px;
    }

    section p {
        margin-left: 15px;
        font-size: 20px;
    }

    section p span{
        font-weight: 700;
    }
`;
