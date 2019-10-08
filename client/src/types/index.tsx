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
    child: string
}

export type Item = {
    _id: string,
    category: string,
    name: string,
    size: number,
    price: number,
    img: string
}

