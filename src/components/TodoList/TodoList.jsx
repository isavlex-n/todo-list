import React, { useEffect, useState, memo } from 'react'
import TodoForm from '../TodoForm'
import TodoListItem from '../TodoListItem'
import dayjs from 'dayjs'
import Modal from '../Modal'
import { database } from '../../firebase'
import {
  ref,
  set,
  onValue,
  push,
  child,
  get,
  update,
  remove
} from 'firebase/database'
import { useAuth } from '../../hooks/use-auth'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [modal, setModal] = useState(false)
  const { id } = useAuth()

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = () => {
    const userTodosRef = ref(database, `todos/${id}`)
    onValue(userTodosRef, (snapshot) => {
      const todosList = []
      snapshot.forEach((childSnapshot) => {
        todosList.push({...childSnapshot.val(), id: childSnapshot.key})
      })
      setTodos(todosList)
    })
  }

  const createTodo = (values) => {
    const userTodosRef = ref(database, `todos/${id}`)
    const newTodo = push(userTodosRef)
    values.checked = dayjs(values.completion).isBefore()
    set(newTodo, values)
    setModal(false)
  }

  const editTodo = (values, todoId) => {
    const todoRef = ref(database, `todos/${id}/${todoId}`)
    update(todoRef, values)
  }

  const checkedTodo = (todo) => {
    console.log(todo)
    const todoRef = ref(database, `todos/${id}/${todo.id}`)
    update(todoRef, {checked: !todo.checked})
  }

  const deleteTodo = (todoId) => {
    const todoRef = ref(database, `todos/${id}/${todoId}`)
    remove(todoRef)
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

export default memo(TodoList)
