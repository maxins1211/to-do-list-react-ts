import TaskInput from '../TaskInput/TaskInput'
import TaskList from '../TaskList/TaskList'
import styles from './todoList.module.scss'
import { useEffect, useState } from 'react'
import { Todo } from '../../@types/todo.type'

const syncReactToLocal = function (handler: (todoArr: Todo[]) => Todo[]) {
  const todosString = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosString || '[]')
  const newTodosObj = handler(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currenTodo, setCurrentTodo] = useState<Todo | null>(null)
  const toBeDoneList = todos.filter((todo) => !todo.isDone)
  const doneList = todos.filter((todo) => todo.isDone)

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    setTodos(todosObj)
  }, [])

  const addTodo = (tittle: string) => {
    const newTodo: Todo = {
      tittle,
      isDone: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, newTodo])
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    const newTodosObj = [...todosObj, newTodo]
    localStorage.setItem('todos', JSON.stringify(newTodosObj))
  }

  const changeTodo = (id: string, isDone: boolean) => {
    const handler = (todoArr: Todo[]) => {
      return todoArr.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone }
        }
        return todo
      })
    }
    setTodos(handler)
    syncReactToLocal(handler)
  }

  const startEditTodo = (id: string) => {
    const findedTodo = todos.find((todo) => todo.id === id)
    if (findedTodo) {
      setCurrentTodo(findedTodo)
    }
  }

  const editTodo = (tittle: string) => {
    setCurrentTodo((prev) => {
      if (prev) {
        return { ...prev, tittle }
      }
      return null
    })
  }

  const completeEditTodo = () => {
    const handler = (todoArr: Todo[]) => {
      return todoArr.map((todo) => {
        if (todo.id === (currenTodo as Todo).id) {
          return currenTodo as Todo
        }
        return todo
      })
    }
    setTodos(handler)
    setCurrentTodo(null)
    syncReactToLocal(handler)
  }

  const deleteTodo = (id: string) => {
    const handler = (todoArr: Todo[]) => todoArr.filter((todo) => todo.id !== id)
    setTodos(handler)
    syncReactToLocal(handler)
  }

  console.log(currenTodo)
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTodo={currenTodo} editTodo={editTodo} completeEditTodo={completeEditTodo} />
        <TaskList
          todos={toBeDoneList}
          taskListName='Your To Do'
          changeTodo={changeTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          todos={doneList}
          taskListName='Completed'
          changeTodo={changeTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}
