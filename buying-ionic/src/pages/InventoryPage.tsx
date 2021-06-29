import { IonButtons, IonContent, IonHeader, IonIcon, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { inventoryState, ItemCategory } from '../state/Inventory';
import { InventoryItem }  from '../components/InventoryItem';
import React from 'react';
import './Page.css';

const InventoryPage: React.FC<RouteComponentProps> = (props) => {
    const inventory = useRecoilValue(inventoryState);

    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Inventory</IonTitle>
            </IonToolbar>
          </IonHeader>
    
          <IonContent fullscreen>
            <IonList>
              {inventory.map((itm) => (
                <InventoryItem 
                    code={itm.code} 
                    category={itm.category} 
                    description={itm.description} 
                    price={itm.price} />)
              )}
            </IonList>
          </IonContent>
        </IonPage>
    );
};

export default InventoryPage;



