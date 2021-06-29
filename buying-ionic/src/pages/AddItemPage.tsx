import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonPage, IonTitle, IonToolbar  } from '@ionic/react';
import { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { cartState, CartDisplayItem } from '../state/Cart';
import { CartItem } from '../components/CartItem';
import NumKeyboard from '../components/NumKeyboard';
import { inventoryState, findItem, ItemCategory } from '../state/Inventory';
import './Page.css';

const AddItemPage: React.FC = () => {
    const inventory = useRecoilValue(inventoryState);
    const [cart, setCart] = useRecoilState(cartState);
    const [itemCode, setArticleNum] = useState("");
    const [itemFound, setArticleFound] = useState(false);
    const [tempCartItem, setTempCartItem] = useState<CartDisplayItem>();

    const handleKey = (arg: string) => {
      console.debug("pressed key " + arg);

      // OK key
      if (arg == "OK") {
        // add article to shopping cart
        if (tempCartItem) {
          const item = findItem(tempCartItem.code , inventory);
          if (item) {
            console.debug("add to cart");
            setCart((cart) => [ ...cart,
              {
                itemCode: itemCode,
                count: tempCartItem.count,
              }
            ]);

            // clear temp cart item
            setTempCartItem(undefined);
            setArticleNum("");
            setArticleFound(false);
          }
        }
        return;
      }

      let newItemCode = itemCode;
      if (arg == "Back") {
        if (itemCode.length > 0) {
          newItemCode = itemCode.substring(0, itemCode.length-1);
        }
      } else {
        if (itemCode.length < 3) {
          newItemCode = itemCode + arg;
        }
      }
      setArticleNum(newItemCode);

      if (newItemCode.length == 3) {
          // 3 digits entered
          const item = findItem(newItemCode, inventory);
          if (item) {
              setArticleFound(true);
              setTempCartItem({
                code: item.code,
                description: item.description,
                category: item.category,
                price: item.price,
                count: 1,
                itemprice: item.price,
              });
          }
          else {
              setTempCartItem({
                code: "",
                description: "unknown Article",
                category: ItemCategory.Open,
                price: 0,
                count: 0,
                itemprice: 0,
              });
          }
      } else {
        setTempCartItem(undefined);
        setArticleFound(false);
      }
    };

    const incCount = () => {
      if (tempCartItem) {
        setTempCartItem({
          ...tempCartItem,
          count: tempCartItem.count + 1,
        });
      }
    };

    const decCount = () => {
      if (tempCartItem && tempCartItem.count > 0) {
        setTempCartItem({
          ...tempCartItem,
          count: tempCartItem.count -1,
        });
      }
    };

    return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
            <IonBackButton />
            </IonButtons>
            <IonTitle>Add article</IonTitle>
        </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
        <IonHeader collapse="condense">
            <IonToolbar>
            <IonTitle size="large">New</IonTitle>
            </IonToolbar>
        </IonHeader>
        <NumKeyboard callback={handleKey} okEnabled={itemFound} />
        <IonGrid>
            <IonRow>
              <IonCol size="4"></IonCol>
              <IonCol class="ion-justify-content-center">
                  {itemCode}
              </IonCol>
              <IonCol size="4"></IonCol>
            </IonRow>
            <IonRow>
                <IonCol> {
                    (tempCartItem && (                      
                  <CartItem 
                    code={tempCartItem.code} description={tempCartItem.description} 
                    category={tempCartItem.category} count={tempCartItem.count} 
                    onincrement={incCount} ondecrement={decCount}
                  />))
                }  
                </IonCol> 
            </IonRow>
        </IonGrid>
        </IonContent>
    </IonPage>
    );
};

export default AddItemPage;
