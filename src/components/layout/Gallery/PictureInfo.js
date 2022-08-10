import { ClickAwayListener } from "@mui/base";
import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";

import { api } from "../../../utils/api";
import { UserContext } from "../../../assets/contexts/userContext";

export default function PictureInfo({ pictureInfo, setPictureInfo }) {
    const { id, show } = pictureInfo;
    const [picture, setPicture] = useState({});

    const { user } = useContext(UserContext);

    useEffect(() => {
        const promise = api.get(`/pictures/${id}`);
        promise.then((response) => {
            setPicture(response.data);
        });
        promise.catch((error) => {
            console.log(error.response);
            alert("Um erro aconteceu, tente novamente");
            closeModal();
        });
    }, []);

    function closeModal() {
        setPictureInfo({
            show: false,
            id: 0,
        });
    }

    return (
        <Modal isOpen={show} onRequestClose={closeModal} style={customStyles}>
            <ClickAwayListener onClickAway={closeModal}>
                {Object.keys(picture).length > 0 ? (
                    <Section>
                        <img src={picture.pictureUrl} />
                        <p>
                            <span>Produto:</span> {picture.product.name}
                        </p>
                        <p>
                            <span>Descrição:</span> {picture.description}
                        </p>
                        <p>
                            <span>Temas:</span>
                        </p>
                        {picture.themesPicture.map((theme) => (
                            <p>{theme.name}</p>
                        ))}
                        <AiFillCloseCircle onClick={closeModal} />
                    </Section>
                ) : (
                    <></>
                )}
            </ClickAwayListener>
        </Modal>
    );
}

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 60%;
        max-width: 60vh;
        margin-bottom: 10px;
    }

    p {
        font-size: 18px;
        text-align: center;
        line-height: 23px;
    }

    p span {
        font-weight: 700;
        font-size: 20px;
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
