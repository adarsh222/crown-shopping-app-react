import { useEffect } from "react";
import { createContext, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.jsx";


export const CategoryContext = createContext({
    categoriesMap: [],
    setProducts: () => null
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategories] = useState([]);
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategories(categoryMap);
        }
        getCategoriesMap();
    }, []);

    const value = { categoriesMap, setCategories };
    return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>

}

