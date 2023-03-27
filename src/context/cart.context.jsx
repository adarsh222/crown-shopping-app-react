
import { useEffect, useState } from "react";
import { createContext } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    cartCount: 0,
    setCartCount: () => null,
    clearItemFromCart: () => null,
    total:0,
    setTotal: () => null,
});


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
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {
            return total += cartItem.quantity;
        }, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => {
            return total += cartItem.quantity * cartItem.price;
        }, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }


    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToRemove) => {
        setCartItems(clearCartItem(cartItems, cartItemToRemove))
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart,cartTotal };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}