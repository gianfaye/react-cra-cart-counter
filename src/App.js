/*
* item: {
*   id: number
*   count: number
*   name: string
* }
*
* Total Count
* Items
* State per item: count
*
* Actions:
* Add
* Decrease
* Remove
*
* max quantity: 20
*
* */

/*
* Product Owner
* User story: Add to cart
* Acceptance criteria:
* as a user i should be able to add to cart
* as a user i want to see the total number of items in my cart
*
* QA - test cases
* as a user i should not be able to see negative count in my cart
* mozilla firefox, edge, safari, chrome => desktop
* mobile => iphone se 375px width
*
* Dev
* UI for listing products
* Add quantity functionality
* Decrease quantity
* Remove from cart functionality
* Remove all items in cart // reset
*
* 100php off - peso discount
* 10% off - percent off
* free delivery
* free shopping fee
* */

import {useMemo, useState} from "react";
import {INITIAL_ITEMS, MAXIMUM_ITEM_QUANTITY} from "./utils/constants";

const App = () => {
  const [items, setItems] = useState(INITIAL_ITEMS)

  const totalQuantities = useMemo(() => {
    const itemsCount = items.map(item => item.count)
    const sum = itemsCount.reduce((prev,curr)=> prev + curr)
    return sum
  }, [items])

  const totalItemsInCart = useMemo(() => {
    const itemsWithCount = items.filter(item => item.count > 0)
    const numberOfItemsWithCount = itemsWithCount.length
    return numberOfItemsWithCount
  }, [items])

  const handleUpdateQuantity = (id, action) => {
    // Boolean checkers
    const isActionIncrease = action === 'increase'
    const isActionDecrease = action === 'decrease'
    const isReachedMaxQuantity = totalQuantities >= MAXIMUM_ITEM_QUANTITY
    // Guard clause for maximum quantity when adding
    if(isActionIncrease && isReachedMaxQuantity) return
    // Look for the item in the items list using the id
    const item = items.find(item => item.id === id)
    // Get the item index
    const itemIndex = items.indexOf(item)
    // Get the item count
    const itemCount = item.count
    // Set the new count of the item
    let newCount
    if(isActionIncrease){
      newCount = itemCount + 1 // add 1 if increase
    }
    if(isActionDecrease){
      newCount = itemCount - 1 // deduct 1 if decrease
    }
    // Prevent negative count
    const isNegative = newCount < 0
    // Guard clause to exit the function if negative
    if(isNegative) return
    // Shallow copy item
    const newItem = {...item}
    // Set new count
    newItem.count = newCount
    // Shallow copy items
    const newItems = [...items]
    // Replace new item
    newItems.splice(itemIndex,1, newItem)
    // Update items
    setItems(newItems)
  }

  const handleRemove = (id) => {
    // Look for the item on the items array
    const item = items.find(item => item.id === id)
    // Look for the item index
    const itemIndex = items.indexOf(item)
    // Remove item from items list before pushing to updated item
    const newItems = [...items]
    newItems.splice(itemIndex,1)
    // Set new item count
    setItems(newItems)
  }

  const handleReset = () => {
    setItems(INITIAL_ITEMS)
  }

  return (
    <>
      <div>
        <h1>Shop</h1>
        <div>
          <span>Total Items in Cart: {totalItemsInCart}</span>
        </div>
        <div>
          <span>Total Qty: {totalQuantities}</span>
        </div>
        {items.map(item => {
          const { id, count, name } = item
          return (
            <div key={id}>
              <div>{name} - {count}</div>
              <div>
                <button onClick={() => handleUpdateQuantity(id, 'increase')}>+</button>
                <button onClick={() => handleUpdateQuantity(id, 'decrease')}>-</button>
                <button onClick={() => handleRemove(id)}>Remove</button>
              </div>
            </div>
          )
        })}
        <div>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </>
  );
}

export default App;
