import { GiCupcake, GiNotebook } from "react-icons/gi";
import { MdPhotoLibrary } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function AdminMenu({ name }) {
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
            <li onClick={() => navigate("/orders")}>
                <GiNotebook />
                <p>Encomendas</p>
            </li>
        </ul>
    );
}
