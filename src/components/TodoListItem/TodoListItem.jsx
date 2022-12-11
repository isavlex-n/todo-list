import React, { useState } from 'react'
import dayjs from 'dayjs'
import TodoForm from '../TodoForm'
import Modal from '../Modal'
import './TodoListItem.css'
import { Reorder, useDragControls } from 'framer-motion'

import Drag from '../../icons/Drag'

const variants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
}

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
  const controls = useDragControls()
  return (
    <Reorder.Item
      value={todo}
      dragControls={controls}
      dragListener={false}
      className="item"
      {...variants}
    >
      <div className="item__group" onClick={() => setModal(!modal)}>
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={() => checkedTodo(todo)}
          onClick={(e) => e.stopPropagation()}
        />
        <span
          className={
            todo.checked || dayjs(todo.completion).isBefore()
              ? 'item__title done'
              : 'item__title'
          }
        >
          {todo.title}
        </span>

        <button onClick={(e) => deleteTodo(e, todo.id)} className="button">
          Delete
        </button>
      </div>
      <Drag dragControls={controls} />
      <Modal active={modal} setActive={setModal}>
        <TodoForm
          todo={todo}
          submitHandler={edit}
          submitText="Save"
          setShow={setModal}
        />
      </Modal>
    </Reorder.Item>
  )
}
