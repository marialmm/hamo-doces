import Modal from "react-modal";
import styled from "styled-components";

export default function PopUp({ popUp, setPopUp, children }) {
    function closePopUp() {
        setPopUp(false);
    }

    return (
        <Modal
            isOpen={popUp}
            onRequestClose={closePopUp}
            style={customStyles}
            ariaHideApp={false}
        >
            <Container>{children}</Container>
        </Modal>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: space-around;

    p {
        font-size: 18px;
        width: 200px;
        text-align: center;
    }
    p:first-child {
        font-weight: 700;
    }
    button {
        background-color: var(--button-color);
        border: none;
        width: 250px;
        height: 40px;
        border-radius: 5px;
        font-size: 18px;
    }
`;

const customStyles = {
    overlay: {
        backgroundColor: " #00000052",
        zIndex: 4,
    },
    content: {
        width: "338px",
        height: "250px",
        backgroundColor: "var(--secondary-color)",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};
