import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
[selectCategoryReducer],
(categoriesSlice)=>categoriesSlice.categories
)

export const selectCategoriesMap = (state) => {
    return state.category.categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
}

export const selectIsLoading = (state)=>state.isLoading;