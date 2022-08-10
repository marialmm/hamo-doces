import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../assets/contexts/userContext";
import { api } from "../../utils/api";

import Header from "../layout/Header/Header";
import New from "../layout/New";

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
            <New>
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
            </New>
        </>
    );
}