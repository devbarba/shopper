import { IProduct } from 'interfaces/product';

// eslint-disable-next-line no-shadow
enum Age {
    twentyFour = '24h',
    fortyEight = '48h',
    seventyTwo = '72h'
}

interface IBasket {
    items: {
        product: Omit<IProduct, 'stockLevel'>,
        quantity: number;
    }[];
    delivery: {
        zip_code: string;
    };
    age?: Age;
    coupon?: string;
    cost: number;
}

export { IBasket, Age };
