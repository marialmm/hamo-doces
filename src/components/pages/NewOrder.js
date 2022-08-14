import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../assets/contexts/userContext";
import { api } from "../../utils/api";
import New from "../layout/New";

export default function NewOrder() {
    const [themes, setThemes] = useState([]);
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState({
        clientName: "",
        status: "",
        deliveryDate: "",
        amountPaid: "",
        theme: "",
        products: [
            {
                quantity: "",
                id: "",
                price: "",
                flavor: "",
            },
        ],
        totalPrice: "",
    });
    const [orderTheme, setOrderTheme] = useState("");

    const navigate = useNavigate();
    const { header } = useContext(UserContext);

    useEffect(() => {
        const themePromise = api.get("/themes");
        const productsPromise = api.get("/products/filter");

        const promise = Promise.all([themePromise, productsPromise]);
        promise.then((response) => {
            setThemes(response[0].data);
            setProducts(response[1].data);
        });
    }, []);

    function addNewProduct() {
        setOrder({
            ...order,
            products: [
                ...order.products,
                {
                    quantity: "",
                    id: "",
                    price: "",
                },
            ],
        });
    }

    function sendOrder(e) {
        e.preventDefault();
        let totalPrice = 0;
        order.products.forEach((product, index) => {
            totalPrice += product.price * product.quantity;
            if (product.flavor === "") {
                delete order.products[index].flavor;
            }
            delete order.products[index].price;
        });
        order.totalPrice = totalPrice;
        if (order.theme === "other") {
            order.theme = orderTheme;
        }
        const promise = api.post("/orders", order, header);
        promise.then(() => {
            navigate("/orders");
        });
        promise.catch((e) => {
            console.log(e);
            alert("Um erro aconteceu, tente novamente!");
        });
    }

    return (
        <New>
            <h2>Nova encomenda</h2>
            <form onSubmit={sendOrder}>
                <input
                    type="text"
                    placeholder="Cliente"
                    value={order.clientName}
                    onChange={(e) =>
                        setOrder({ ...order, clientName: e.target.value })
                    }
                    required
                />
                <label htmlFor="status">Status</label>
                <select
                    name="status"
                    value={order.status}
                    onChange={(e) =>
                        setOrder({ ...order, status: e.target.value })
                    }
                    required
                >
                    <option></option>
                    <option value="accepted">Aceita</option>
                    <option value="making">Fazendo</option>
                    <option value="delivered">Entregue</option>
                    <option value="cancelled">Cancelada</option>
                </select>
                <input
                    type="date"
                    value={order.deliveryDate}
                    onChange={(e) =>
                        setOrder({ ...order, deliveryDate: e.target.value })
                    }
                    required
                />
                <input
                    type="number"
                    placeholder="Quantia paga"
                    min={0}
                    value={order.amountPaid}
                    onChange={(e) =>
                        setOrder({
                            ...order,
                            amountPaid: parseInt(e.target.value),
                        })
                    }
                    required
                />
                <label htmlFor="theme">Tema</label>
                <select
                    name="theme"
                    value={order.theme}
                    onChange={(e) =>
                        setOrder({ ...order, theme: e.target.value })
                    }
                >
                    <option></option>
                    {themes.map((theme) => (
                        <option value={theme.name}>{theme.name}</option>
                    ))}
                    <option value="other">Outro</option>
                </select>
                {order.theme === "other" ? (
                    <input
                        type="text"
                        name="theme"
                        value={orderTheme}
                        onChange={(e) => setOrderTheme(e.target.value)}
                        required
                    />
                ) : (
                    <></>
                )}
                <label htmlFor="product">Produtos</label>
                {order.products.map((orderProduct, index) => (
                    <>
                        <select
                            name="product"
                            onChange={(e) => {
                                order.products[index].id =
                                    parseInt(e.target.value.split(",")[0]);
                                order.products[index].price =
                                    e.target.value.split(",")[1];
                                setOrder({ ...order });
                            }}
                        >
                            <option></option>
                            {products.map((product) => (
                                <option value={[product.id, product.price]}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="Quantidade"
                            min={1}
                            value={order.products[index].quantity}
                            onChange={(e) => {
                                order.products[index].quantity = parseInt(
                                    e.target.value
                                );
                                setOrder({ ...order });
                            }}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Sabor"
                            value={order.products[index].flavor}
                            onChange={(e) => {
                                order.products[index].flavor = e.target.value;
                                setOrder({ ...order });
                            }}
                        />
                    </>
                ))}
                <p onClick={addNewProduct}>Adicionar produto</p>
                <button type="submit">Cadastrar</button>
            </form>
        </New>
    );
}
