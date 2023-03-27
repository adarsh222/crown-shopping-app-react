import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import "./checkout-item.styles.scss";


const CheckOutItem = ({ cartItem }) => {
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);
    const { name, quantity, imageUrl, price } = cartItem;
    return (<div className="checkout-item-container">
        <div className="image-container">
            <img src={imageUrl} alt={name}></img>
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
            <div className="arrow" onClick={() => { removeItemFromCart(cartItem) }}>
                &#10094;
            </div>
            <span className="value">{quantity}</span>
            <div className="arrow" onClick={() => { addItemToCart(cartItem) }}>
                &#10095;

            </div>
        </span>
        <span className="price">{price}</span>
        <div className="remove-button" onClick={() => { clearItemFromCart(cartItem) }}> &#10005;</div>

    </div>);
}

export default CheckOutItem;