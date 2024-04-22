import React from 'react'
import { Todo } from '../../@types/todo.type'
import styles from './task.module.scss'
interface TaskProps {
  todo: Todo
  changeTodo: (id: string, isDone: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

export default function Task(props: TaskProps) {
  const { todo, changeTodo, startEditTodo, deleteTodo } = props
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeTodo(todo.id, event.target.checked)
  }

  return (
    <li className={styles.task}>
      <input className={styles.taskCheckbox} type='checkbox' onChange={handleCheckbox} checked={todo.isDone} />
      <span className={todo.isDone ? `${styles.taskName} ${styles.taskNameDone}` : styles.taskName}>{todo.tittle}</span>
      <div className={styles.taskAction}>
        <button onClick={() => startEditTodo(todo.id)} className={styles.taskBtn}>
          ✍🏻
        </button>
        <button onClick={() => deleteTodo(todo.id)} className={styles.taskBtn}>
          ❌
        </button>
      </div>
    </li>
  )
}
