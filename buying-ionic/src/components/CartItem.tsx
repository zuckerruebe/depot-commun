import { IonButton, IonGrid, IonRow, IonCol, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { basketOutline, beerOutline, wineOutline } from 'ionicons/icons';
import { add, remove } from 'ionicons/icons';
import { ItemCategory } from '../state/Inventory';
import { iconFromCategory } from '../components/InventoryItem';

interface CartItemProps {
    code: string;
    category: ItemCategory;
    description: string;
    count: number;
    onincrement: () => void;
    ondecrement: () => void;
  }
  

export const CartItem: React.FC<CartItemProps> = (props) => {
    return (
        <IonItem lines="full">
            <IonIcon icon={iconFromCategory(props.category)} slot="start" />
            <IonLabel>{props.description}</IonLabel>
            <IonButton size="small" fill="clear" onClick={props.ondecrement} item-right>
                <IonIcon icon={remove} />
            </IonButton>
            {props.count}
            <IonButton size="small" fill="clear" onClick={props.onincrement} item-right>
                <IonIcon icon={add} />
            </IonButton>
        </IonItem>
    );
};
