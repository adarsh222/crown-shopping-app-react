
import { useEffect, useState, useReducer } from "react";
import { createContext } from "react";
import { createAction } from "../utils/reducer/reducer.utils";
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    cartCount: 0,
    setCartCount: () => null,
    clearItemFromCart: () => null,
    total: 0,
    setTotal: () => null,
});


const INITIAL_STATE = {
    isCartOpen: true,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
    SET_CART_ITEMS: "SET_CART_ITEMS"
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    // console.log(type,payload);
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled type of type ${type}`)
    }
}


const addCartItem = (cartItems, productToAdd) => {
    // find if contains the product
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id);

    // if found increment it 
    if (existingCartItem) {
        return cartItems.map((cartItem) => {
            return cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        });
    }

    // return new array of cart items

    return [...cartItems, { ...productToAdd, quantity: 1 }]

}

const clearCartItem = (cartItems, cartItemToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
}


const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the item to remove
    const existingCartItem = cartItems.find(item => item.id === cartItemToRemove.id);
    //if quantity is equal to 1 remove from cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
    // return remaining cart items

    return cartItems.map((cartItem) => {
        return cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    });
}

export const CartProvider = ({ children }) => {
    const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => {
            return total += cartItem.quantity;
        }, 0);

        const newCartTotal = newCartItems.reduce((total, cartItem) => {
            return total += cartItem.quantity * cartItem.price;
        }, 0);

        dispatch(
            createAction( CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal,
            })
        );


    };

    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => {
    //         return total += cartItem.quantity;
    //     }, 0);
    //     setCartCount(newCartCount);
    // }, [cartItems]);

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce((total, cartItem) => {
    //         return total += cartItem.quantity * cartItem.price;
    //     }, 0);
    //     setCartTotal(newCartTotal);
    // }, [cartItems]);


    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);
    }


    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = (removeCartItem(cartItems, cartItemToRemove));
        updateCartItemReducer(newCartItems);

    }

    const clearItemFromCart = (cartItemToRemove) => {
        const newCartItems = (clearCartItem(cartItems, cartItemToRemove));
        updateCartItemReducer(newCartItems);
    }

    const setIsCartOpen =(bool)=>{
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,bool));
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}