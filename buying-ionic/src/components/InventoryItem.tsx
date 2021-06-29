import { IonIcon, IonItem, IonLabel, IonNote } from '@ionic/react';
import { basketOutline, beerOutline, wineOutline } from 'ionicons/icons';
import { ItemCategory } from '../state/Inventory';

type InventoryItemProps = {
    code: string,
    category: ItemCategory,
    description: string,
    price: number, 
}

export const iconFromCategory = (cat : ItemCategory) => {
    if (cat == ItemCategory.Beer) {
        return beerOutline;
    } 
    if (cat == ItemCategory.Wine) {
        return wineOutline;
    }
    else
        return basketOutline;
};

export const InventoryItem: React.FC<InventoryItemProps> = (props) => {
    return (
        <IonItem lines="full">
            <IonIcon icon={iconFromCategory(props.category)} slot="start"/>
            <IonLabel>
                <p>{props.description}</p>
                <p>{props.code}</p>
            </IonLabel>
            <IonNote slot="end">{props.price.toLocaleString(
                undefined,
                {minimumFractionDigits: 2}
                )}
            </IonNote>
        </IonItem>
    );
};
