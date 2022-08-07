import { GiCupcake } from "react-icons/gi";
import { MdPhotoLibrary } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ClientMenu({ name }) {
    const navigate = useNavigate();

    return (
        <ul>
            <p>Olá, {name}!</p>
            <li onClick={() => navigate("/products")}>
                <GiCupcake />
                <p>Produtos</p>
            </li>
            <li onClick={() => navigate("/")}>
                <MdPhotoLibrary />
                <p>Galeria</p>
            </li>
        </ul>
    );
}
