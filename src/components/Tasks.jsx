import React,  {useEffect} from 'react';
import Task from './Task';
import { getApiTasks } from '../App'

const Tasks = ({todos, setTodos}) => {
  useEffect( () => {
    getApiTasks().then(data => setTodos(data))
  } , [])
  
   return (
    <>
      {todos.map((todo) => (
        <Task key={todo._id} todo={todo} setTodos={setTodos}/>
      ))}
    </>
  )
}

export default Tasks