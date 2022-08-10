import { useContext } from "react";
import { UserContext } from "../../../assets/contexts/userContext";
import { api } from "../../../utils/api";
import PopUp from "./PopUp";

export default function DeletePopUp({ popUp, setPopUp, setFilter }) {
    const { header } = useContext(UserContext);

    function deletePicture() {
        const promise = api.delete(`/pictures/${popUp.id}`, header);
        promise.then(() => {
            setFilter({
                themeId: 0,
                productId: 0,
            });
            setPopUp(false);
        });
        promise.catch((e) => {
            console.log(e.response);
            setPopUp({ id: 0, show: false });
        });
    }

    return (
        <PopUp popUp={popUp.show} setPopUp={setPopUp}>
            <p>Deseja apagar a foto?</p>
            <button onClick={deletePicture}>Apagar</button>
            <button onClick={() => setPopUp({ id: 0, show: false })}>
                Cancelar
            </button>
        </PopUp>
    );
}
