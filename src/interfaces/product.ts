// eslint-disable-next-line no-shadow
enum Sizes {
    S = 'small',
    M = 'medium',
    L = 'large',
    XL = 'extra large',
    XXL = 'extra extra large'
}

interface IProduct {
    sku: string;
    name: string;
    size: Sizes,
    price: number;
    stockLevel: number;
}

export { IProduct, Sizes };
