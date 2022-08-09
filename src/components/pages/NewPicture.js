import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../assets/contexts/userContext";
import { api } from "../../utils/api";

import Header from "../layout/Header/Header";

export default function NewPicture() {
    const [pictureInfo, setPicutreInfo] = useState({
        description: "",
        isMain: false,
        product: "",
        pictureUrl: "",
        themes: [""],
    });

    const { header } = useContext(UserContext);
    const navigate = useNavigate();

    function sendPictureInfo(e) {
        e.preventDefault();
        const promise = api.post("/pictures", pictureInfo, header);
        promise.then(() => {
            navigate("/");
        });
        promise.catch((e) => {
            console.log(e.response.data);
            alert("Um erro aconteceu, tente novamente!");
        });
    }

    return (
        <>
            <Header />
            <Main>
                <h2>Nova foto</h2>
                <form onSubmit={sendPictureInfo}>
                    <input
                        type="text"
                        placeholder="URL da foto"
                        value={pictureInfo.pictureUrl}
                        onChange={(e) =>
                            setPicutreInfo({
                                ...pictureInfo,
                                pictureUrl: e.target.value,
                            })
                        }
                        required
                    />
                    <input
                        type="text"
                        placeholder="Produto"
                        value={pictureInfo.product}
                        onChange={(e) =>
                            setPicutreInfo({
                                ...pictureInfo,
                                product: e.target.value,
                            })
                        }
                        required
                    />
                    <label htmlFor="isMain">
                        <input
                            type="checkbox"
                            name="isMain"
                            value={pictureInfo.isMain}
                            onChange={(e) =>
                                setPicutreInfo({
                                    ...pictureInfo,
                                    isMain: !pictureInfo.isMain,
                                })
                            }
                        />
                        Foto principal
                    </label>
                    <textarea
                        placeholder="Descrição"
                        value={pictureInfo.description}
                        onChange={(e) =>
                            setPicutreInfo({
                                ...pictureInfo,
                                description: e.target.value,
                            })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Tema 1"
                        value={pictureInfo.themes[0]}
                        onChange={(e) => {
                            pictureInfo.themes[0] = e.target.value;
                            setPicutreInfo({ ...pictureInfo });
                        }}
                        required
                    />
                    {pictureInfo.themes.map((theme, index) => (
                        <input
                            type="text"
                            placeholder={`Tema ${index + 2}`}
                            value={pictureInfo.themes[index + 1]}
                            onChange={(e) => {
                                pictureInfo.themes[index + 1] = e.target.value;
                                setPicutreInfo({ ...pictureInfo });
                            }}
                        />
                    ))}
                    <button type="submit">Enviar</button>
                </form>
            </Main>
        </>
    );
}

const Main = styled.main`
    padding: 20px;

    h2 {
        font-size: 25px;
        font-weight: 700;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 100%;
        margin-top: 15px;
    }

    form input,
    form select,
    form textarea {
        max-width: 90%;
        width: 317px;
        height: 40px;
        border-radius: 5px;
        padding: 5px;
        margin-bottom: 10px;
        border: 1px solid var(--accent-color);
        font-size: 18px;
        background-color: #ffffff;
    }

    form textarea {
        height: 80px;
    }

    form label {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 90%;
    }

    form label input {
        width: 20px;
        height: 20px;
        margin: 0px 5px 0 0;
    }

    form input:focus,
    form select:focus,
    form textarea:focus {
        outline: 2px solid var(--accent-color);
    }

    form input::placeholder,
    form textarea::placeholder {
        font-size: 16px;
    }

    button {
        width: 200px;
        max-width: 80%;
        height: 40px;
        background-color: var(--button-color);
        border: none;
        border-radius: 10px;
        font-size: 18px;
        margin: 15px 0px;
    }
`;
