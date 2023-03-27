import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { UserContext } from '../../context/user.context';
import "./navigation.styles.scss";
import { useContext } from 'react';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CardDropDown from '../../components/card-dropdown/card-dropdown.component';
import { CartContext } from '../../context/cart.context';
const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to="/">
                    <CrownLogo className='logo'>Logo</CrownLogo>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to="/shop">SHOP</Link>
                    {currentUser ? (<span className='nav-link'  onClick={signOutUser}>SIGN OUT</span>): 
                    (<Link className='nav-link' to="/auth">SIGN IN</Link>)}
                    <CartIcon></CartIcon>
                </div>
                { isCartOpen && <CardDropDown></CardDropDown>}
            </div>
            <Outlet
            ></Outlet>
        </Fragment>
    )
}

export default Navigation;