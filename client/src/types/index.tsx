export type Child = {
    _id: string,
    name: string,
    user: string,
    birthdate: string,
    gender: string,
    clothesSize: string,
    shoeSize: string,
    img: string
    categories: Array<Category>
}

export type Category = {
    name: string,
    _id: string,
    child: string,
    items: Array<Item>
}

export type Item = {
    _id: string,
    category: string,
    name: string,
    size: number,
    price: number,
    img: string
}

export type User = {
    id: string;
    displayName: string;
    token: string;
}

export type SignInProps = {
    setUserState: (user: User) => void;
}

export type AppBarProps = {
    user: User;
    logout: () => void;
}

export type MenuProps = {
    buttonName: string, 
    menuItems: Array<string>,
    logout?:() => void
  }