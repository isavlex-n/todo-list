import React, { useState } from 'react'
import TodoForm from '../TodoForm'
import TodoListItem from '../TodoListItem'
import dayjs from 'dayjs'
import Modal from '../Modal'

export default function TodoList() {
  const [todos, setTodos] = useState([])
  const [modal, setModal] = useState(false)

  const createTodo = (values) => {
    values.id = Date.now()
    values.checked = dayjs(values.completion).isBefore()
    values.edit = false
    setTodos([...todos, values])
    setModal(false)
  }

  const editTodo = (values, id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ...values }
      }
      return todo
    })
    setTodos(() => updatedTodos)
  }

  const checkedTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, checked: !todo.checked }
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

  return (
    <div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoListItem
            todo={todo}
            checkedTodo={checkedTodo}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            key={todo.id}
          />
        ))}
      </ul>
      <button onClick={() => setModal(true)} className="button">
        Add todo
      </button>
      <Modal active={modal} setActive={setModal}>
        <TodoForm
          submitHandler={createTodo}
          submitText="Add todo"
          todo={null}
        />
      </Modal>
    </div>
  )
}
