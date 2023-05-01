import { useContext } from "react";
import CheckOutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../context/cart.context";
import "./checkout.styles.scss";
import {
    selectCartItems,
    selectCartTotal,
  } from '../../store/cart/cart.selector';
import { useSelector } from "react-redux";
const CheckOut = () => {
    // const { cartItems, addItemToCart, removeItemFromCart,cartTotal } = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return (<div className="checkout-container">
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>

            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>

            </div>
        </div>

        {
            cartItems.map((cartItem) => {
                return <CheckOutItem key={cartItem.id} cartItem={cartItem}></CheckOutItem>
            })
        }
        <span className="total">Total: ${cartTotal}</span>
    </div >);
}

export default CheckOut;