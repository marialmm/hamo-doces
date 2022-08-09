import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";

import { UserContext } from "../../assets/contexts/userContext";
import { api } from "../../utils/api";
import Header from "../layout/Header/Header";
import { useNavigate } from "react-router-dom";

export default function Gallery() {
    const [gallery, setGallery] = useState([]);
    const [themes, setThemes] = useState([]);
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState({
        themeId: 0,
        productId: 0,
    });

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const galleryPromise = api.get(`/pictures${getFilter()}`);
        const themePromise = api.get("/themes");
        const productPromise = api.get("/products/filter");
        Promise.all([galleryPromise, themePromise, productPromise])
            .then((response) => {
                setGallery(response[0].data);
                setThemes(response[1].data);
                setProducts(response[2].data);
            })
            .catch((e) => {
                console.log(e);
                alert("Um erro aconteceu, tente novamente!");
            });
    }, [filter]);

    function getFilter() {
        let getFilter = "?";
        if (filter.themeId != 0) {
            getFilter += `&theme=${filter.themeId}`;
        }
        if (filter.productId != 0) {
            getFilter += `&product=${filter.productId}`;
        }
        return getFilter;
    }

    return (
        <>
            <Header />
            <Main>
                {gallery.length === 0 ? (
                    <h2>Não há fotos para serem exibidas!</h2>
                ) : (
                    <>
                        <form>
                            <p>Filtrar por:</p>
                            <select
                                value={filter.themeId}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        themeId: e.target.value,
                                    })
                                }
                            >
                                <option value={0}>Tema</option>
                                {themes.map((theme) => (
                                    <option value={theme.id} key={theme.id}>
                                        {theme.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={filter.productId}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        productId: e.target.value,
                                    })
                                }
                            >
                                <option value={0}>Produto</option>
                                {products.map((product) => (
                                    <option value={product.id} key={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                        </form>
                        <section>
                            {gallery.map((picture) => (
                                <img
                                    src={picture.pictureUrl}
                                    key={picture.id}
                                />
                            ))}
                        </section>
                    </>
                )}
                {user && user.role === "ADMIN" ? (
                    <AiFillPlusCircle
                        onClick={() => navigate("/gallery/new")}
                    />
                ) : (
                    <></>
                )}
            </Main>
        </>
    );
}

const Main = styled.main`
    justify-content: flex-start;
    align-items: flex-start;

    h2 {
        font-size: 20px;
        font-weight: 600;
    }

    form {
        margin: 20px;
    }

    form select {
        margin: 5px 10px 0px 0px;
        min-width: 100px;
        height: 30px;
        font-size: 15px;
        padding: 5px;
        border-radius: 5px;
        background-color: var(--secondary-color);
        border: solid 1px var(--button-color);
    }

    form select:focus {
        outline: solid 2px var(--button-color);
    }

    section {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: flex-start;
        width: 100%;
    }

    section img {
        width: 150px;
        margin: 15px;
    }

    svg {
        position: absolute;
        bottom: 30px;
        right: 25px;
        font-size: 50px;
        color: var(--button-color);
        cursor: pointer;
    }
`;
