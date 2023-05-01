import { useContext } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CardDropDown = () => {
    // const { cartItems } = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate("/checkout");
    }
    return (<div className="cart-dropdown-container">
        <div className='cart-items'>
            {cartItems.length ? (
                cartItems.map((cartItem) => {
                    return <CartItem key={cartItem.id} cartItem={cartItem} />
                })
            ) : (
                <span className='empty-message'>Your cart is empty</span>
            )}
        </div>
        <Button onClick={goToCheckoutHandler}>Checkout</Button>

    </div>);
}
export default CardDropDown;