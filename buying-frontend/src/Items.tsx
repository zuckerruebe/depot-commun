import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouterProps } from 'react-router-dom';
import { Box, Button, Paragraph } from 'grommet';
import { NumberInput } from 'grommet-controls'
import axios from 'axios';
import { useAuth } from './context/auth';

type Item = {
  product_nr: string,
  tags: string,
  name: string,
  price: number,
}

type ItemWithAmount = {
  item: Item,
  amount: number
}

const Items : FunctionComponent<RouterProps> = (props) => {

  const [itemsWithAmount, setItemsWithAmount] = useState<ItemWithAmount[]>([]);

  useEffect(() => {
    // called when component has mounted

    // load items list
    axios.get('/buying/items/available-items/')
    .then(response => {
      const items: Item[] = response.data
      const initialItemsWithAmount = items.map((i) => {return {item: i, amount: 0}})
      setItemsWithAmount(initialItemsWithAmount)
    })
    .catch(error => {
      console.log('error on getting items: ' + error)
    })
  }, [])

  const auth = useAuth()

  function createItemBox(itemWithAmount: ItemWithAmount): JSX.Element {
    const item = itemWithAmount.item
    return (
      <Box direction="row" border={{ "style": "solid" }}
        pad="medium" gap="medium" flex={false}>
        <Paragraph>{item.product_nr}</Paragraph>
        <Box align="start" justify="center" fill="horizontal">
          <Paragraph>
            {item.name}
          </Paragraph>
        </Box>
        <NumberInput textAlign="end"
            value={itemWithAmount.amount.toString()}
            onChange={(x: {target: HTMLInputElement | null}) => {itemWithAmount.amount = parseInt(x.target!.value); setItemsWithAmount([...itemsWithAmount])}}
            min={0}
            thousandsSeparatorSymbol="." />
        <Paragraph textAlign="end">
          {item.price}
        </Paragraph>
      </Box>
    )
  }

  async function makePurchase() {
    const itemsWithPositiveAmount = itemsWithAmount.filter(ia => ia.amount > 0);
    const purchase = { items: itemsWithPositiveAmount.map(ia => {return {product_nr: ia.item.product_nr, quantity: ia.amount}}) }
    axios.post(`/buying/users/${auth.userId}/purchases/`, purchase).catch(error =>
      console.log('error posting purchase: ' + error)
    )
  }

  return (
    <Box direction="column" justify="start" overflow="scroll" fill="horizontal">
    { itemsWithAmount.map(createItemBox)}
    <Button onClick={makePurchase}>Make purchase</Button>
  </Box>
  )
}

export default Items;

