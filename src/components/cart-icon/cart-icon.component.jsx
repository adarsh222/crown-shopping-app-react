import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/cart.context";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import "./cart-icon.styles.scss";

const CartIcon = () => {
    // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (<div className="cart-icon-container" onClick={toggleIsCartOpen}>
        <ShoppingIcon className='shopping-icon' />
        <span className="item-count">{cartCount}</span>
    </div>);
}

export default CartIcon;