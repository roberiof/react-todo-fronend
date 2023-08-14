import React, { useState } from 'react'
import Form from './components/Form'
import Tasks from './components/Tasks'
  
export const api = 'https://react-todo-backend-svr6.onrender.com/tasks'
export const getApiTasks = async() =>{
  return await fetch(api).then( res => res.json()).then(data => data)
}

function App() {
  const [ todos , setTodos ] = useState( [] )
  
  return (
    <>
      <div id='wrapperTitleForm'>
        <h1> What's the Plan for Today? </h1>
        <Form setTodos={setTodos}/> 
      </div>

      <div id='wrapperTodoList'>
        <Tasks todos={todos} setTodos={setTodos}/>
      </div>
    </>
  )
}

export default App
