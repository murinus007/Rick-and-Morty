import React from "react"
import TodoItem from "./TodoItem/TodoItem"
import TodoForm from "./TodoItem/TodoForm"
import "./WatchList.css"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

export default function WatchList() {
  const [items, setItemsValue] = useState(() => {
    const saved = localStorage.getItem("items")
    const value = JSON.parse(saved)
    return value || []
  })

  const addItem = (item) => {
    items.push({
      id: uuidv4(),
      title: item,
      done: false,
    })

    setItemsValue([...items])
  }

  const doneItem = (id) => {
    const index = items.map((item) => item.id).indexOf(id)
    items[index].done = true

    setItemsValue([...items])
  }

  const deleteItem = (id) => {
    const newItems = items.filter((val) => val.id != id)
    setItemsValue(newItems)
  }

  const activeItems = items.filter((item) => !item.done)
  const doneItems = items.filter((item) => item.done)

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
    console.log(items)
  })

  return (
    <div className="App">
      <div className="main_list">
        <h1 className="top">To Watch Later : {activeItems.length}</h1>
        <TodoForm addItem={addItem} />
        {[...activeItems, ...doneItems].map((item) => (
          <TodoItem
            doneItem={() => doneItem(item.id)}
            deleteItem={() => deleteItem(item.id)}
            item={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  )
}
