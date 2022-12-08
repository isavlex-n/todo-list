import React, { useEffect, useState, memo, createRef } from 'react'
import TodoForm from '../TodoForm'
import TodoListItem from '../TodoListItem'
import dayjs from 'dayjs'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Modal from '../Modal'
import './TodoList.css'
import { database } from '../../firebase'
import { ref, set, onValue, push, update, remove } from 'firebase/database'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [modal, setModal] = useState(false)
  const { uid } = useContext(AuthContext)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = () => {
    const userTodosRef = ref(database, `todos/${uid}`)
    onValue(userTodosRef, (snapshot) => {
      const todosList = []
      snapshot.forEach((childSnapshot) => {
        todosList.push({
          ...childSnapshot.val(),
          id: childSnapshot.key,
          nodeRef: createRef(null)
        })
      })
      setTodos(todosList)
    })
  }

  const createTodo = (values) => {
    const userTodosRef = ref(database, `todos/${uid}`)
    const newTodo = push(userTodosRef)
    values.checked = dayjs(values.completion).isBefore()
    set(newTodo, values)
    setModal(false)
  }

  const editTodo = (values, todoId) => {
    const todoRef = ref(database, `todos/${uid}/${todoId}`)
    update(todoRef, values)
  }

  const checkedTodo = (todo) => {
    const todoRef = ref(database, `todos/${uid}/${todo.id}`)
    update(todoRef, {
      checked: !todo.checked,
    })
  }

  const deleteTodo = (e, todoId) => {
    console.log('here')
    e.stopPropagation()
    const todoRef = ref(database, `todos/${uid}/${todoId}`)
    remove(todoRef)
  }

  return (
    <div>
      <ul className="todo-list">
        <TransitionGroup>
          {todos.map((todo) => (
            <CSSTransition
              key={todo.id}
              timeout={500}
              classNames="todo-list__item"
              nodeRef={todo.nodeRef}
            >
              <TodoListItem
                todo={todo}
                checkedTodo={checkedTodo}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
                key={todo.id}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
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
