import { atom } from 'recoil';

export enum ItemCategory {
    Beer,
    Wine,
    Beverage,
    Packaged,
    Open,
    Household
}

export type Item =  {
    code: string
    category: ItemCategory
    description: string
    price: number
}

export const inventoryState = atom({
    key: 'inventoryState',
    default: [
        <Item>({
            code : "123",
            category: ItemCategory.Beer,
            description: "Bier, Paul",
            price: 1.10
        }),
        <Item>({
            code : "124",
            category: ItemCategory.Beer,
            description: "Bier, Sprint",
            price: 1.10
        }),
        <Item>({
            code : "135",
            category: ItemCategory.Wine,
            description: "Prosecco, Volpi",
            price: 8.50
        }),
    ],
});

export function findItem(code: string, items: Item[]): Item | undefined {
    return items.find(a => a.code == code);
} 
