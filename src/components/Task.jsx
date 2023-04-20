import React, { useRef, useState } from 'react'
import { motion, stagger } from 'framer-motion'
import { BsTrash , BsBookmarkCheckFill, BsBookmarkCheck } from 'react-icons/bs'; 
import { VscEdit } from 'react-icons/vsc'
import { AiOutlineCheck , AiOutlineClose } from 'react-icons/ai'
import { api } from '../App';

const Task = ({ todo , setTodos }) => {
  const [name , setName] = useState(todo.name)
  const defaultIcons = useRef()
  const editIconsDiv = useRef()
  const editIcon = useRef()
  const input = useRef()
  const todoDiv = useRef()

  const editDone= async() => {
    todo.done = !todo.done 
    await fetch(`${api}/${todo._id}` , {
      method: 'PATCH',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setTodos(prev => prev.map(t => t === todo ? t = todo : t))
  }

  const confirmEditName = async() =>{
    if(!(name.trim())){
      closeEditName()
      alert('The name cannot be empty.')
      setName(todo.name)
      return
    }

    todo.name = name 
    await fetch(`${api}/${todo._id}`, {
      method: 'PATCH',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    closeEditName()
  }

  const openEditName = () => {
    defaultIcons.current.classList.add('hidden')
    editIconsDiv.current.classList.remove('hidden')
    input.current.disabled = false
    input.current.focus()
    todoDiv.current.classList.add('editStyle')
  }

  const closeEditName = () => {
    defaultIcons.current.classList.remove('hidden')
    editIconsDiv.current.classList.add('hidden')
    input.current.disabled = true 
    todoDiv.current.classList.remove('editStyle')
  }

  const deleteTask = async( id ) => {
    await fetch (`${ api }/${ id }` , {
      method: 'DELETE',
    })
    setTodos(prev => prev.filter(item => item._id !== id))
  }

  return ( 
    <motion.div 
    className={todo.done ? 'todo done' : 'todo'} 
    ref={todoDiv}
    onDoubleClick={() => editDone()}
    initial={{ opacity: 0 , y: -150}}
    whileInView={{ opacity: todo.done ? .4 : 1 , y: 0, pathLength: 0}}
    viewport={{ once: true }}
    whileHover={{scale: 1.03}}
    whileTap={{scale: 0.97}}
    >
        <input type='text' ref={input} value={name} onChange={(e) => setName(e.target.value)} disabled={true}/>

        <div className='icons' ref={defaultIcons}>
          <button tabIndex='0' onClick={() => editDone()}> 
            <span className="icon">{todo.done ? <BsBookmarkCheckFill/> : <BsBookmarkCheck/>}</span>
           </button>

          <button tabIndex='0' onClick={() => openEditName()} ref={editIcon} style={{display: todo.done ? 'none' : 'flex'}}> 
            <span className="icon"><VscEdit/> </span>
          </button>

          <button tabIndex='0' onClick={() => deleteTask( todo._id )}> 
            <span className="icon"> <BsTrash/> </span>
          </button>
        </div>

        <div className='icons edit hidden' ref={editIconsDiv}>
          <button tabIndex='0' onClick={() => confirmEditName()}> 
            <span className="icon"> <AiOutlineCheck/> </span>
          </button>
          
          <button tabIndex='0' onClick={() => closeEditName()}> 
            <span className="icon"> <AiOutlineClose/> </span>
          </button>
        </div>
    </motion.div>
  )
}

export default Task