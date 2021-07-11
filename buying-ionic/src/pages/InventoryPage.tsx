import { IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, queryCurrentUser } from '../state/Auth';
import { inventoryState, ItemCategory } from '../state/Inventory';
import { InventoryItem }  from '../components/InventoryItem';
import { useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import './Page.css';

type ApiItem = {
  product_nr : number,
  name: string,
  price: number,
  tags: string[],
  number_of_items_in_stock: number,
}

const InventoryPage: React.FC<RouteComponentProps> = (props) => {
    const [inventory, setInventory] = useRecoilState(inventoryState);

    const [auth, setAuth] = useRecoilState(authState);

    useEffect(() => {
        const checkAuth = async () => {
          const newAuth = await queryCurrentUser();
          // todo: this is useless as it is
          if (auth !== newAuth) {
            setAuth(newAuth);
          }
        }
        checkAuth();
      }, [auth]);

    useEffect(() => {       
      // load inventory from API
      axios.get('/buying/items/available-items/')
      .then(response => {
        setInventory(response.data.map((itm : ApiItem) => {
          return {
            code: itm.product_nr.toString(),
            description: itm.name,
            price: itm.price,
          }
        }));
      })
      .catch(error => {
        console.log('error on getting items: ' + error)
      })
    }, [])
  
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Inventory</IonTitle>
              <IonLabel slot="end">{auth.userName}</IonLabel>
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



