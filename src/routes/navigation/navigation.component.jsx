import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
// import { UserContext } from '../../context/user.context';
import {
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink,
  } from './navigation.styles';
import { useContext } from 'react';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CardDropDown from '../../components/card-dropdown/card-dropdown.component';
import { CartContext } from '../../context/cart.context';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';

const Navigation = () => {
    const  currentUser =useSelector(selectCurrentUser);
    // const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer  to="/">
                    <CrownLogo className='logo'>Logo</CrownLogo>
                </LogoContainer > 
                <NavLinks>
                    <NavLink to='/shop'>SHOP</NavLink>
                    {currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to='/auth'>SIGN IN</NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                { isCartOpen && <CardDropDown></CardDropDown>}
            </NavigationContainer>
            <Outlet
            ></Outlet>
        </Fragment>
    )
}

export default Navigation;