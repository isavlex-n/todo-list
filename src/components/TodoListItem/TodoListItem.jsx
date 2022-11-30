import React, { useState } from 'react'
import dayjs from 'dayjs'
import TodoForm from '../TodoForm'
import Modal from '../Modal'
import './TodoListItem.css'

export default function TodoListItem({
  todo,
  checkedTodo,
  editTodo,
  deleteTodo,
}) {
  const [modal, setModal] = useState(false)
  const edit = (values) => {
    editTodo(values, todo.id)
    setModal(!modal)
  }
  return (
    <li className="item" onClick={() => setModal(!modal)}>
      <div className="item__group">
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={() => checkedTodo(todo)}
          onClick={e => e.stopPropagation()}
        />
        <span
          className={todo.checked || dayjs(todo.completion).isBefore() ? 'item__title done' : 'item__title'}
        >
          {todo.title}
        </span>
        <button onClick={() => deleteTodo(todo.id)} className="button">Delete</button>
      </div>
      <Modal active={modal} setActive={setModal}>
        <TodoForm
          todo={todo}
          submitHandler={edit}
          submitText="Save"
          setShow={setModal}
        />
      </Modal>
    </li>
  )
}
