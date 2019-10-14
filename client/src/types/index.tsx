export type Child = {
    _id: string,
    name: string,
    user: string,
    birthdate: string,
    gender: string,
    clothesSize: string,
    shoeSize: string,
    img: string
}

export type Category = {
    name: string,
    _id: string,
    child: string,
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
    logout?:() => void,
    reloadChildren?:() => void,
    category?: Category,
    child?: Child,
    token?: string
  }

export type CategoryContentProps = {
    category: Category,
    token: string 
}

export type HomeProps = {
    user: User;
}

export type Authorization = {
    headers: {'Authorization': string}
};
