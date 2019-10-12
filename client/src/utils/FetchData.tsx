import { Category, Child, Item, Authorization } from "../types";
import axios from 'axios';

export const fetchChildren = async (authorization: Authorization) => {
    const res = await axios.get("http://localhost:4000/children", authorization);
    const childrenArr: Array<Child> = res.data.children;
    return childrenArr;
};

export const fetchCategories = async (child: Child, authorization: Authorization) => {
    const res = await axios.post("http://localhost:4000/categories/all", { childId: child._id }, authorization);
    const categoriesArr: Array<Category> = res.data.categories;
    return categoriesArr;
};

export const fetchItems = async (category: Category, authorization: Authorization) => {
    const res = await axios.post("http://localhost:4000/items/all", { categoryId: category._id }, authorization);
    const itemsArr: Array<Item> = res.data.items;
    return itemsArr;
};

export const deleteItem = async (itemId: string, authorization: Authorization) => {
    const res = await axios.delete("http://localhost:4000/items/" + itemId, authorization);
    const data = res.data.deletedCount;
    console.log(data);
    
    return data;
}

export const addItem = async (data: FormData, authorization: Authorization) => {
    const res = await axios.post("http://localhost:4000/items/", data, authorization);
    return res;
};