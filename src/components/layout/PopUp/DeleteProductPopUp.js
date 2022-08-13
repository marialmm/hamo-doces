import { useContext } from "react";
import { UserContext } from "../../../assets/contexts/userContext";
import { api } from "../../../utils/api";
import PopUp from "./PopUp";

export default function DeleteProductPopUp({
    popUp,
    setPopUp,
    reload,
    setReload,
}) {
    const { header } = useContext(UserContext);

    function deleteProduct() {
        const promise = api.delete(`/products/${popUp.id}`, header);
        promise.then(() => {
            setReload(!reload);
            setPopUp({
                show: false,
                id: 0,
            });
        });
        promise.catch((e) => {
            console.log(e.response);
            alert("Um erro aconteceu, tente novamente");
            setPopUp({
                show: false,
                id: 0,
            });
        });
    }
    return (
        <PopUp popUp={popUp.show} setPopUp={setPopUp}>
            <p>Deseja apagar o produto?</p>
            <button onClick={deleteProduct}>Apagar</button>
            <button
                onClick={() =>
                    setPopUp({
                        show: false,
                        id: 0,
                    })
                }
            >
                Cancelar
            </button>
        </PopUp>
    );
}
