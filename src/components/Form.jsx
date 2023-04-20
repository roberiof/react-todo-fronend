import React, {useRef, useState} from 'react';
import { api, getApiTasks } from '../App';

const Form = ({ setTodos }) =>{
  const [name , setName] = useState( '' )
  const input = useRef()

  const isValidName = () =>{
    if(!(name.trim())){
      input.current.classList.add('input-error')
      return false
    }else{
      if(input.current.classList.contains('input-error')){
        input.current.classList.remove('input-error')
      }
      return true  
    }
  }

  const handleSubmit =  async(e) =>{
    e.preventDefault()


    if(!isValidName()){
      return
    }

    const todo = {
      name: name, 
      done: false
    }

    await fetch(api , {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json"
      }
    })

    getApiTasks().then(data => setTodos(data))

    setName('')
  }
  
  return (
    <form onSubmit={handleSubmit} > 
      <input ref={input} autoComplete='off' type="text" placeholder="Add a todo" value={name} onChange={ (e) => setName(e.target.value)}
      />
      <button type="submit"> Add Task </button>
    </form>
  )
}

export default Form 