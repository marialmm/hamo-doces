import { MdPhotoLibrary, MdLogin, MdPersonAddAlt1 } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function GenericMenu() {
    const navigate = useNavigate();

    return (
        <ul>
            <li onClick={() => navigate("/")}>
                <MdPhotoLibrary />
                <p>Galeria</p>
            </li>
            <li onClick={() => navigate("/signin")}>
                <MdLogin />
                <p>Login</p>
            </li>
            <li onClick={() => navigate("/signup")}>
                <MdPersonAddAlt1 />
                <p>Cadastro</p>
            </li>
        </ul>
    );
}
