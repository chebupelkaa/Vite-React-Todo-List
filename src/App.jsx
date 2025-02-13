
import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"

export default function App() {
  const [todos,setTodos]=useState(()=>{
    const localValue=localStorage.getItem("ITEMS")
    if(localValue==null) return []
    return JSON.parse(localValue)
  })

  useEffect(()=>{
    localStorage.setItem("ITEMS",JSON.stringify(todos))
  },[todos])

  function generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  function addTodo(title){
    setTodos(currentTodos=>{
      return [...currentTodos,
        // {id:crypto.randomUUID(),title:title,completed:false},]
        { id: generateId(), title: title, completed: false },]
    })
  } 

  function toggleTodo(id,completed){
    setTodos(currentTodos=>{
      return currentTodos.map(todo=>{
        if(todo.id==id){
          return {...todo,completed }
        }
        return todo
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos=>{
      return currentTodos.filter(todo=>todo.id!==id)
    })
  }

  return ( 
    <>
      <NewTodoForm onSubmit={addTodo}/>

      <div className="some-div">
        <h1 className="header">ToDo List</h1>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
      </div>
     
    </>

  )
}

