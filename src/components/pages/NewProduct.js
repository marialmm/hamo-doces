import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../assets/contexts/userContext";
import { api } from "../../utils/api";

import Header from "../layout/Header/Header";
import New from "../layout/New";

export default function NewProduct() {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "0.00",
    });

    const navigate = useNavigate();
    const { header } = useContext(UserContext);

    function sendProduct(e) {
        e.preventDefault();
        const price = Math.floor(parseFloat(product.price) * 100);
        if (price < 0) {
            alert("Preço não pode ser menor que 0!");
            setProduct({ ...product, price: "0.00" });
            return;
        }

        if (product.description.length === 0) {
            delete product.description;
        }

        const promise = api.post("/products", { ...product, price }, header);
        promise.then(() => {
            navigate("/products");
        });
        promise.catch((e) => {
            console.log(e.response);
            alert("Um erro aconteceu, tente novamente!");
        });
    }

    return (
        <>
            <Header />
            <New>
                <h2>Novo Produto</h2>
                <form onSubmit={sendProduct}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={product.name}
                        onChange={(e) =>
                            setProduct({ ...product, name: e.target.value })
                        }
                        required
                    />
                    <textarea
                        placeholder="Descrição"
                        value={product.description}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                description: e.target.value,
                            })
                        }
                    />
                    <input
                        type="number"
                        placeholder="Preço"
                        value={product.price}
                        onChange={(e) =>
                            setProduct({ ...product, price: e.target.value })
                        }
                        required
                    />
                    <button type="submit">Enviar</button>
                </form>
            </New>
        </>
    );
}
