import { atom, selector } from 'recoil';
import { ItemCategory, inventoryState, findItem } from './Inventory';

type CartItem = {
    itemCode: string;
    count: number;
}

export type CartDisplayItem = {
    code: string;
    description: string;
    category: ItemCategory;
    price: number;
    count: number;
    itemprice: number;
}

export const cartState = atom({
    key: 'cartState',
    default: new Array<CartItem>(),
})

export const cartDisplayState = selector({
    key: 'cartDisplayState',
    get: ({get}) => {
        const cart = get(cartState);
        const articles = get(inventoryState);
        return cart.map(itm => {
            const article = findItem(itm.itemCode, articles);
            return <CartDisplayItem>({
                code: article?.code,
                description: article?.description,
                category: article?.category,
                price: article?.price,
                count: itm.count,
                itemprice: article ? itm.count * article?.price : 0,
            });
        })
    }
})
