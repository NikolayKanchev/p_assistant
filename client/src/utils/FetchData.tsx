import { Category, Child, Item } from "../types";
import axios from 'axios';

const authorization = (token: string) => {
    return { headers: {'Authorization': `Bearer ${token}`}}
};

export const loginRequest = async (email: string, password: string) => {
    const res = await axios.post("http://localhost:4000/users/login", { email: email, password: password });
    return res;
}

export const fetchChildren = async (token: string) => {
    const res = await axios.get("http://localhost:4000/children", authorization(token));
    const childrenArr: Array<Child> = res.data.children;
    return childrenArr;
};

export const fetchCategories = async (child: Child, token: string) => {
    const res = await axios.post("http://localhost:4000/categories/all", { childId: child._id }, authorization(token));
    const categoriesArr: Array<Category> = res.data.categories;
    return categoriesArr;
};

export const fetchItems = async (category: Category, token: string) => {
    const res = await axios.post("http://localhost:4000/items/all", { categoryId: category._id }, authorization(token));
    const itemsArr: Array<Item> = res.data.items;
    return itemsArr;
};

export const deleteItem = async (itemId: string, token: string) => {
    const res = await axios.delete("http://localhost:4000/items/" + itemId, authorization(token));
    const data = res.data.deletedCount;    
    return data;
}

export const addItem = async (data: FormData, token: string) => {
    const res = await axios.post("http://localhost:4000/items/", data, authorization(token));
    return res;
};

export const updateItem = async (data: FormData, token: string, itemId: string) => {
    const res = await axios.patch("http://localhost:4000/items/" + itemId, data, authorization(token));
    return res;
};

export const addChild = async (data: FormData, token: string) => {
    const res = await axios.post("http://localhost:4000/children", data, authorization(token));
    return res;
};

export const updateChild = async (data: FormData, token: string, childId: string) => {
    const res = await axios.patch("http://localhost:4000/children/" + childId, data, authorization(token));
    return res;
};

export const deleteChild = async (token: string, childId: string) => {
    const res = await axios.delete("http://localhost:4000/children/" + childId, authorization(token));
    return res;
};